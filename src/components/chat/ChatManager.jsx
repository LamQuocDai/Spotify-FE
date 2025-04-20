import { useState } from "react";
import { ActionIcon, Box, Badge, Avatar, Group } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import ChatSidebar from "./ChatSidebar";
import ChatPopup from "./popup";

// Mock initial user data
const MOCK_USERS = [
  { id: 1, name: "Try Hard CaoT", status: "online", unread: 4, lastMessage: "Đang hoạt động" },
  { id: 2, name: "Chong Jong Cho", status: "offline", unread: 0, lastMessage: "tôi đang ở thành máy" },
  { id: 3, name: "David Miller", status: "online", unread: 2, lastMessage: "Hey, how are you?" },
  { id: 4, name: "Sarah Johnson", status: "away", unread: 0, lastMessage: "Let's catch up later" },
  { id: 5, name: "Michael Brown", status: "online", unread: 0, lastMessage: "Thanks for the help!" },
  { id: 6, name: "Emily Wilson", status: "offline", unread: 0, lastMessage: "See you tomorrow" },
];

export default function ChatManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState([]);
  const [totalUnread, setTotalUnread] = useState(6); // Example total unread count

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectChat = (user) => {
    // Check if the chat is already active
    if (!activeChats.find(chat => chat.id === user.id) && 
        !minimizedChats.find(chat => chat.id === user.id)) {
      // Limit active chats to 3
      if (activeChats.length >= 3) {
        // Move the oldest chat to minimized
        const chatsToKeepActive = [...activeChats.slice(1)];
        const chatToMinimize = activeChats[0];
        setMinimizedChats([...minimizedChats, chatToMinimize]);
        setActiveChats([...chatsToKeepActive, user]);
      } else {
        setActiveChats([...activeChats, user]);
      }
    } 
    // If chat is minimized, restore it
    else if (minimizedChats.find(chat => chat.id === user.id)) {
      const chatToRestore = minimizedChats.find(chat => chat.id === user.id);
      setMinimizedChats(minimizedChats.filter(chat => chat.id !== user.id));
      
      // Handle more than 3 active chats
      if (activeChats.length >= 3) {
        const chatsToKeepActive = [...activeChats.slice(1)];
        const chatToMinimize = activeChats[0];
        setMinimizedChats([...minimizedChats.filter(chat => chat.id !== user.id), chatToMinimize]);
        setActiveChats([...chatsToKeepActive, chatToRestore]);
      } else {
        setActiveChats([...activeChats, chatToRestore]);
      }
    }
    
    // Reset unread count for this user
    if (user.unread > 0) {
      setTotalUnread(prev => prev - user.unread);
      user.unread = 0;
    }
  };

  const handleCloseChat = (chatId) => {
    setActiveChats(activeChats.filter(chat => chat.id !== chatId));
  };

  const handleMinimizeChat = (chatId) => {
    const chatToMinimize = activeChats.find(chat => chat.id === chatId);
    setActiveChats(activeChats.filter(chat => chat.id !== chatId));
    setMinimizedChats([...minimizedChats, chatToMinimize]);
  };

  const handleRestoreChat = (chatId) => {
    const chatToRestore = minimizedChats.find(chat => chat.id === chatId);
    setMinimizedChats(minimizedChats.filter(chat => chat.id !== chatId));
    
    // Handle case with too many active chats
    if (activeChats.length >= 3) {
      const chatsToKeepActive = [...activeChats.slice(1)];
      const chatToMinimize = activeChats[0];
      setMinimizedChats([...minimizedChats.filter(chat => chat.id !== chatId), chatToMinimize]);
      setActiveChats([...chatsToKeepActive, chatToRestore]);
    } else {
      setActiveChats([...activeChats, chatToRestore]);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Box
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1001,
        }}
      >
        <ActionIcon
          radius="xl"
          size="xl"
          color="#0084ff"
          onClick={toggleSidebar}
          style={{ position: "relative" }}
        >
          <IconMessage size={24} />
          {totalUnread > 0 && (
            <Badge
              color="red"
              size="sm"
              radius="xl"
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                minWidth: "20px",
              }}
            >
              {totalUnread}
            </Badge>
          )}
        </ActionIcon>
      </Box>

      {/* Chat Sidebar */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onSelectChat={(user) => {
          handleSelectChat(user);
          // Optionally close the sidebar when selecting on mobile
          if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
          }
        }}
      />

      {/* Minimized Chat Indicators */}
      {minimizedChats.length > 0 && (
        <Box
          style={{
            position: "fixed",
            bottom: "20px",
            right: "80px",
            zIndex: 1001,
            display: "flex",
            gap: "10px",
          }}
        >
          {minimizedChats.map((chat, index) => (
            <Group 
              key={chat.id} 
              onClick={() => handleRestoreChat(chat.id)}
              style={{ 
                cursor: "pointer", 
                backgroundColor: "#242f4b",
                padding: "5px 10px",
                borderRadius: "20px",
                position: "relative",
              }}
            >
              <Box style={{ position: "relative" }}>
                <Avatar
                  size="sm"
                  src="/placeholder.svg?height=32&width=32"
                  alt={`${chat.name} avatar`}
                />
                <Box
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 8,
                    height: 8,
                    backgroundColor: chat.status === "online" ? "#4CAF50" : 
                                    chat.status === "away" ? "#FFC107" : "#9E9E9E",
                    borderRadius: "50%",
                    border: "2px solid #242f4b",
                  }}
                />
              </Box>
              {chat.name.split(' ')[0]}
              {chat.unread > 0 && (
                <Badge
                  color="red"
                  size="sm"
                  radius="xl"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    minWidth: "20px",
                  }}
                >
                  {chat.unread}
                </Badge>
              )}
            </Group>
          ))}
        </Box>
      )}

      {/* Active Chat Windows */}
      {activeChats.map((chat, index) => (
        <ChatPopup
          key={chat.id}
          chat={chat}
          position={index}
          onClose={() => handleCloseChat(chat.id)}
          onMinimize={() => handleMinimizeChat(chat.id)}
        />
      ))}
    </>
  );
}