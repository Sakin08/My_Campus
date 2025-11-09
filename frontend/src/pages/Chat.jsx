import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      <ChatSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      {selectedUser ? (
        <ChatBox receiver={selectedUser} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a user to start chatting 💬
        </div>
      )}
    </div>
  );
}
