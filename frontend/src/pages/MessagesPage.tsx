import React, { useState } from "react";

export default function MessagesPage() {
  // Sample user conversations
  const sampleConversations = [
    {
      id: "1",
      participant: "Jane Smith",
      listingTitle: "Girls Pleated Skirt",
      lastMessage: "Thanks, I’ve received the item today!",
      messages: [
        { sender: "You", content: "Hi Jane, have you shipped the skirt?", timestamp: "Yesterday 9:45 AM" },
        { sender: "Jane Smith", content: "Yes, it was posted first class!", timestamp: "Yesterday 10:30 AM" },
        { sender: "You", content: "Thanks — looking forward to it!", timestamp: "Yesterday 10:35 AM" },
        { sender: "Jane Smith", content: "Thanks, I’ve received the item today!", timestamp: "Today 8:15 AM" },
      ],
    },
    {
      id: "2",
      participant: "John Doe",
      listingTitle: "Boys School Blazer",
      lastMessage: "Great, I’ll confirm when received.",
      messages: [
        { sender: "You", content: "Hi John, blazer dispatched today.", timestamp: "Today 12:00 PM" },
        { sender: "John Doe", content: "Great, I’ll confirm when received.", timestamp: "Today 12:05 PM" },
      ],
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState(sampleConversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const updatedMessages = [
      ...selectedConversation.messages,
      { sender: "You", content: newMessage, timestamp: "Just now" },
    ];
    setSelectedConversation({ ...selectedConversation, messages: updatedMessages });
    setNewMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Conversation List */}
      <aside className="w-full md:w-1/3 bg-gray-50 border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-burgundy">Conversations</h2>
        <ul className="space-y-3">
          {sampleConversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-3 rounded cursor-pointer ${
                selectedConversation.id === conv.id
                  ? "bg-burgundy text-white"
                  : "bg-white hover:bg-gray-100 text-gray-800"
              }`}
            >
              <p className="font-semibold">{conv.participant}</p>
              <p className="text-sm">{conv.listingTitle}</p>
              <p className="text-xs italic mt-1 opacity-80">
                {conv.lastMessage.slice(0, 40)}...
              </p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Conversation Window */}
      <section className="flex-1 flex flex-col border rounded-lg bg-white p-4 shadow-sm">
        {selectedConversation ? (
          <>
            <div className="border-b pb-3 mb-3">
              <h2 className="text-xl font-semibold text-burgundy">
                Chat with {selectedConversation.participant}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedConversation.listingTitle}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 p-2 mb-4 bg-gray-50 rounded">
              {selectedConversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 max-w-xs ${
                      msg.sender === "You"
                        ? "bg-burgundy text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="block text-xs opacity-70 mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-burgundy/30"
              />
              <button
                onClick={handleSendMessage}
                className="bg-burgundy text-white px-4 py-2 rounded hover:bg-burgundy-dark transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 m-auto">
            Select a conversation to view messages.
          </p>
        )}
      </section>
    </div>
  );
}
