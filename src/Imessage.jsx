import React, { useState } from 'react';
import { Search, Info, Video, Plus, Mic, Smile, X, ChevronDown, MessageSquare } from 'lucide-react';

export default function IMessageMockup() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [selectedNumber, setSelectedNumber] = useState('all');
  const [chatTypeFilter, setChatTypeFilter] = useState('all');
  const [readStatusFilter, setReadStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest'); // latest or oldest

  const myNumbers = [
    { id: 'all', label: 'All Numbers', number: '' },
    { id: 'personal', label: 'Personal', number: '+1 (555) 123-4567' },
    { id: 'work', label: 'Work', number: '+1 (555) 987-6543' },
    { id: 'other', label: 'Other', number: '+1 (555) 456-7890' }
  ];

  const conversations = [
    { id: 1, name: 'Mom', preview: "Don't forget to call grandma!", time: '2:34 PM', unread: true, avatar: '👩', isGroup: false, phoneNumber: 'personal', messages: [{ text: "Hi sweetie! How's your day going?", sent: false, time: 'Today 1:15 PM' }], favorite: true },
    { id: 2, name: 'Alex Chen', preview: 'See you at the gym tomorrow?', time: '1:22 PM', unread: false, initials: 'AC', isGroup: false, phoneNumber: 'personal', messages: [], favorite: false },
    { id: 3, name: 'Work Team 💼', preview: 'Sarah: Meeting at 3pm today', time: '12:45 PM', unread: true, avatar: '💼', isGroup: true, phoneNumber: 'work', messages: [], favorite: true },
    { id: 4, name: 'Mike Davis', preview: "I'll bring the snacks", time: 'Yesterday', unread: false, initials: 'MD', isGroup: false, phoneNumber: 'work', messages: [], favorite: false },
    { id: 5, name: 'Family Group 👨‍👩‍👧‍👦', preview: 'Dad: Who wants pizza tonight?', time: 'Yesterday', unread: true, avatar: '👨‍👩‍👧‍👦', isGroup: true, phoneNumber: 'personal', messages: [], favorite: true },
    { id: 6, name: 'Study Group 📚', preview: 'Meeting at library 5pm', time: 'Wednesday', unread: false, avatar: '📚', isGroup: true, phoneNumber: 'other', messages: [], favorite: false },
    { id: 7, name: 'James Park', preview: 'Thanks for your help!', time: 'Tuesday', unread: false, initials: 'JP', isGroup: false, phoneNumber: 'personal', messages: [], favorite: false },
    { id: 8, name: 'Rachel Green', preview: 'Coffee this weekend?', time: 'Monday', unread: false, initials: 'RG', isGroup: false, phoneNumber: 'personal', messages: [], favorite: false },
    { id: 9, name: 'Project Team 🚀', preview: 'Tom: Deadline extended!', time: '9/28', unread: false, avatar: '🚀', isGroup: true, phoneNumber: 'work', messages: [], favorite: false },
    { id: 10, name: 'Lisa Martinez', preview: 'See you there!', time: '9/25', unread: false, initials: 'LM', isGroup: false, phoneNumber: 'other', messages: [], favorite: false }
  ];

  const parseTime = (time) => {
    if (time === 'Today') return new Date();
    if (time === 'Yesterday') return new Date(Date.now() - 24 * 60 * 60 * 1000);
    const parsed = Date.parse(time);
    return isNaN(parsed) ? new Date() : new Date(parsed);
  };

  const filteredConversations = conversations.filter(conv => {
    if (searchQuery && !conv.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedNumber !== 'all' && conv.phoneNumber !== selectedNumber) return false;
    if (chatTypeFilter === 'individual' && conv.isGroup) return false;
    if (chatTypeFilter === 'group' && !conv.isGroup) return false;
    if (readStatusFilter === 'unread' && !conv.unread) return false;
    if (readStatusFilter === 'read' && conv.unread) return false;
    return true;
  });

  const sortedConversations = [...filteredConversations].sort((a, b) =>
    sortOrder === 'latest' ? parseTime(b.time) - parseTime(a.time) : parseTime(a.time) - parseTime(b.time)
  );

  const currentChat = selectedChat !== null ? conversations[selectedChat] : null;
  const hasActiveFilters = selectedNumber !== 'all' || chatTypeFilter !== 'all' || readStatusFilter !== 'all';
  const activeFilterCount = (selectedNumber !== 'all' ? 1 : 0) + (chatTypeFilter !== 'all' ? 1 : 0) + (readStatusFilter !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedNumber('all');
    setChatTypeFilter('all');
    setReadStatusFilter('all');
    setSearchQuery('');
  };

  const FilterChip = ({ active, onClick, children, icon }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
        active ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold">Messages</h1>
            <button className="text-blue-500 hover:text-blue-600">
              <Plus size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Phone Number Dropdown */}
          <div className="mb-3">
            <select
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {myNumbers.map(num => (
                <option key={num.id} value={num.id}>
                  {num.label} {num.number && `${num.number}`}
                </option>
              ))}
            </select>
          </div>

          {/* Filters & Sort */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Filters {activeFilterCount > 0 && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${showFilters ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            <button
              onClick={() => setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest')}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
              <ChevronDown
                size={14}
                className={`transform transition-transform duration-200 ${sortOrder === 'latest' ? 'rotate-0' : 'rotate-180'}`}
              />
            </button>
          </div>

          {/* Filter Chips */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-3 pt-1">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">CHAT TYPE</p>
                <div className="flex gap-2 flex-wrap">
                  <FilterChip active={chatTypeFilter === 'all'} onClick={() => setChatTypeFilter('all')}>All</FilterChip>
                  <FilterChip active={chatTypeFilter === 'individual'} onClick={() => setChatTypeFilter('individual')} icon="👤">Individual</FilterChip>
                  <FilterChip active={chatTypeFilter === 'group'} onClick={() => setChatTypeFilter('group')} icon="👥">Groups</FilterChip>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">STATUS</p>
                <div className="flex gap-2 flex-wrap">
                  <FilterChip active={readStatusFilter === 'all'} onClick={() => setReadStatusFilter('all')}>All</FilterChip>
                  <FilterChip active={readStatusFilter === 'unread'} onClick={() => setReadStatusFilter('unread')} icon="🔵">Unread</FilterChip>
                  <FilterChip active={readStatusFilter === 'read'} onClick={() => setReadStatusFilter('read')} icon="✓">Read</FilterChip>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <X size={14} />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {sortedConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 px-4">
              <Search size={48} className="mb-2" />
              <p className="text-sm text-center">No conversations found</p>
              <button onClick={clearAllFilters} className="mt-2 text-blue-500 text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            sortedConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conversations.findIndex(c => c.id === conv.id))}
                className={`flex items-start p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conversations.findIndex(c => c.id === conv.id) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex-shrink-0 mr-3 relative">
                  {conv.avatar ? (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">{conv.avatar}</div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">{conv.initials}</div>
                  )}
                  {conv.isGroup && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-xs">👥</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500 ml-2">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">{conv.preview}</p>
                    {conv.unread && <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {hasActiveFilters && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 text-center">
            Showing {sortedConversations.length} of {conversations.length} conversations
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                {currentChat.avatar ? (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl mr-3 relative">
                    {currentChat.avatar}
                    {currentChat.isGroup && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-[10px]">👥</div>
                    )}
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium mr-3 relative">
                    {currentChat.initials}
                    {currentChat.isGroup && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white text-[10px]">👥</div>
                    )}
                  </div>
                )}
                <div>
                  <h2 className="font-semibold flex items-center gap-2">{currentChat.name}{currentChat.isGroup && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Group</span>}</h2>
                  <p className="text-xs text-gray-500">{myNumbers.find(n => n.id === currentChat.phoneNumber)?.number || 'iMessage'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Video size={20} className="text-gray-600" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Info size={20} className="text-gray-600" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {currentChat.messages.length > 0 ? (
                <div className="space-y-2">
                  {currentChat.messages.map((msg, idx) => (
                    <div key={idx}>
                      {msg.time && <div className="text-center text-xs text-gray-500 my-4">{msg.time}</div>}
                      <div className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-3xl ${msg.sent ? 'bg-blue-500 text-white rounded-br-md' : 'bg-gray-200 text-black rounded-bl-md'}`}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </div>
                      {msg.status && msg.sent && <div className="text-right text-xs text-gray-500 mt-1 mr-2">{msg.status}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{currentChat.avatar || '💬'}</div>
                    <p className="font-medium">No messages yet</p>
                    <p className="text-xs mt-1">Start the conversation!</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Plus size={20} className="text-gray-600" /></button>
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="iMessage"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) setMessage('');
                    }}
                    className="flex-1 bg-transparent focus:outline-none text-sm"
                  />
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors"><Smile size={20} className="text-gray-600" /></button>
                </div>
                {message ? (
                  <button onClick={() => setMessage('')} className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M3 10l14-7-7 14-2-7-5-2z"/></svg>
                  </button>
                ) : (
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Mic size={20} className="text-gray-600" /></button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare size={80} className="text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Select a Message</h2>
              <p className="text-gray-500 text-sm">Choose a conversation from the list to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
