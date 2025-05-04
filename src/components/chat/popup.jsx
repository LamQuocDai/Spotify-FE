"use client";

import { useState, useEffect, useRef, useContext } from "react";
import {
  Avatar,
  ActionIcon,
  TextInput,
  Group,
  Stack,
  Text,
  Box,
  Paper,
  Flex,
} from "@mantine/core";
import {
  IconX,
  IconPhone,
  IconVideo,
  IconMinus,
  IconMoodSmile,
  IconPaperclip,
  IconPhoto,
  IconSend,
  IconMoon,
  IconSquarePlus,
} from "@tabler/icons-react";
import {
  initChatWebSocket,
  getMessagesService,
} from "../../services/chatService";
import { AuthContext } from "../../context/auth/authContext";
import { jwtDecode } from "jwt-decode";

export default function ChatPopup({
  id,
  chat,
  onClose,
  onMinimize,
  position = 0,
}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState(chat.chatId || null); // Store actual chat ID
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { user, token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;
  // Add a ref to track sent messages to prevent duplicates
  const sentMessagesRef = useRef(new Set());

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Create a chat if needed and load initial messages
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Get the other user's ID
        const otherUserId = chat.userId || chat.otherUserId;

        // Load messages directly with the other user's ID
        try {
          const response = await getMessagesService(otherUserId);
          if (response && response.data) {
            console.log("Loaded messages:", response.data);
            // Transform messages to our format
            const formattedMessages = response.data.map((msg) => ({
              id: msg.id,
              sender: msg.user1 === userId ? "You" : chat.name,
              content: msg.message, // Using message instead of content
              timestamp: new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isUser: msg.user1 === userId,
            }));
            setMessages(formattedMessages);
          }
        } catch (error) {
          console.error("Failed to load messages:", error);
          // Fallback to empty messages list
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        // Fallback to empty messages list
        setMessages([]);
      }
    };

    initializeChat();
  }, [chat.id, chat.userId, user?.id, chat.name]);

  // Set up websocket connection
  useEffect(() => {
    // Make sure we have a user ID
    if (!userId) {
      console.warn("User not authenticated, can't establish chat connection");
      return;
    }

    // Connect to the other user's chat
    const otherUserId = chat.userId || chat.otherUserId;
    console.log(`Attempting to connect to chat with user ID: ${otherUserId}`);

    const handleMessage = (data) => {
      // Handle messages received from WebSocket
      console.log("Received message in popup:", data);

      // Check if the message has the expected structure
      if (data.message) {
        // Determine if the message is from current user or the other person
        const isSentByMe = data.sender === userId.toString();

        // Check if this is a message we just sent (to prevent duplication)
        // We use a combination of sender, content and approximate timestamp to identify duplicates
        const messageKey = `${data.message}-${Date.now()
          .toString()
          .substring(0, 10)}`;

        if (isSentByMe && sentMessagesRef.current.has(messageKey)) {
          console.log("Ignoring echo of message we just sent:", data.message);
          return; // Skip this message as we've already added it locally
        }

        const newMessage = {
          id: data.id || Date.now(),
          sender: isSentByMe ? "You" : chat.name,
          content: data.message,
          timestamp: new Date(data.created_at || Date.now()).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          isUser: isSentByMe,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (data.type === "connection_status") {
        console.log("Connection status update:", data.status);
      } else if (data.error) {
        console.error("WebSocket error message:", data.error);
      }
    };

    const handleConnect = () => {
      setIsConnected(true);
      console.log(`Connected to chat with ${chat.name}`);
    };

    const handleClose = (event) => {
      setIsConnected(false);
      console.log(
        `Disconnected from chat with ${chat.name}`,
        event ? `Code: ${event.code}, Reason: ${event.reason}` : ""
      );
    };

    // Initialize WebSocket connection
    console.log("Initializing WebSocket connection");
    wsRef.current = initChatWebSocket(
      otherUserId,
      handleMessage,
      handleConnect,
      handleClose
    );

    // Clean up on unmount
    return () => {
      console.log("Cleaning up WebSocket connection");
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, [chat.id, chat.name, chat.userId, userId, chat.otherUserId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      try {
        // Create a unique key for this message to track it
        const messageKey = `${inputValue}-${Date.now()
          .toString()
          .substring(0, 10)}`;

        // Create message object for WebSocket
        const messageData = {
          message: inputValue,
          user1: userId,
          user2: chat.userId || chat.otherUserId,
          created_at: new Date().toISOString(),
        };

        console.log(
          `Attempting to send message: "${inputValue}" to ${chat.name}`
        );

        // Send via WebSocket if connected
        let sent = false;
        if (wsRef.current && isConnected) {
          sent = wsRef.current.sendMessage(messageData);
        }

        if (sent) {
          // If message was sent successfully via WebSocket, track it to prevent duplicates
          // when it gets echoed back from the server
          console.log(
            "Message sent successfully, tracking to prevent duplication"
          );
          sentMessagesRef.current.add(messageKey);

          // Add a cleanup timeout to remove the tracked message after a while
          setTimeout(() => {
            sentMessagesRef.current.delete(messageKey);
          }, 5000); // 5 seconds should be enough for server to echo back

          // Add message locally for immediate feedback
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now(),
              sender: "You",
              content: inputValue,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isUser: true,
            },
          ]);
        } else {
          console.warn(
            "Could not send message via WebSocket, connection may be down"
          );
          // If message failed to send via WebSocket, add it to local state
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now(),
              sender: "You",
              content: inputValue,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isUser: true,
            },
          ]);
          // Optionally implement a fallback REST API call here
        }

        setInputValue("");
      } catch (error) {
        console.error("Error sending message:", error);
        // Show an error toast or notification here
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper
      shadow="md"
      radius="md"
      style={{
        overflow: "hidden",
        position: "fixed",
        bottom: "0",
        right: `${320 + position * 340}px`,
        width: "320px",
        height: "450px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        p="xs"
        style={{
          backgroundColor: "#242f4b",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Group gap="xs">
          <Box style={{ position: "relative" }}>
            <Avatar
              size="sm"
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
            />
            <Box
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                backgroundColor:
                  chat.status === "online"
                    ? "#4CAF50"
                    : chat.status === "away"
                    ? "#FFC107"
                    : "#9E9E9E",
                borderRadius: "50%",
                border: "2px solid #242f4b",
              }}
            />
          </Box>
          <Box>
            <Text size="sm" fw={600}>
              {chat.name}
            </Text>
            {/* <Text size="xs" c="gray.3">
              {isConnected
                ? chat.status === "online"
                  ? "Đang hoạt động"
                  : chat.status === "away"
                  ? "Away"
                  : "Offline"
                : "Connecting..."}
            </Text> */}
          </Box>
        </Group>

        <Group gap="md">
          {/* <ActionIcon variant="transparent" color="yellow">
            <IconPhone size={20} />
          </ActionIcon>
          <ActionIcon variant="transparent" color="white">
            <IconVideo size={20} />
          </ActionIcon> */}
          <ActionIcon variant="transparent" color="white" onClick={onMinimize}>
            <IconMinus size={20} />
          </ActionIcon>
          <ActionIcon variant="transparent" color="white" onClick={onClose}>
            <IconX size={20} />
          </ActionIcon>
        </Group>
      </Box>

      {/* Chat area */}
      <Box
        p="md"
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "rgba(36, 47, 75, 0.9)",
          backgroundImage: "url('/placeholder.svg?height=400&width=400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <Stack gap="md">
          {messages.map((message) => (
            <Flex
              key={message.id}
              justify={message.isUser ? "flex-end" : "flex-start"}
              gap="xs"
            >
              {!message.isUser && (
                <Avatar
                  size="sm"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  mt={5}
                />
              )}
              <Box style={{ maxWidth: "70%" }}>
                {!message.isUser && (
                  <Text size="xs" c="gray.3" mb={4}>
                    {message.sender}
                  </Text>
                )}
                <Paper
                  p="xs"
                  radius="xl"
                  style={{
                    backgroundColor: message.isUser ? "#0084ff" : "#3a4257",
                    color: "white",
                    marginLeft: message.isUser ? "auto" : 0,
                  }}
                >
                  <Text size="sm">{message.content}</Text>
                </Paper>
                {message.timestamp && (
                  <Text size="xs" c="gray.5" ta="center" mt={4}>
                    {message.timestamp}
                  </Text>
                )}
              </Box>
              {message.isUser && (
                <Avatar
                  size="sm"
                  src="/placeholder.svg?height=32&width=32"
                  alt="Your avatar"
                  mt={5}
                />
              )}
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      {/* Input area */}
      <Box
        p="xs"
        style={{
          backgroundColor: "#242f4b",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Group gap="xs">
          {/* <ActionIcon variant="transparent" color="yellow">
            <IconMoodSmile size={20} />
          </ActionIcon>
          <ActionIcon variant="transparent" color="yellow">
            <IconPhoto size={20} />
          </ActionIcon>
          <ActionIcon variant="transparent" color="yellow">
            <IconPaperclip size={20} />
          </ActionIcon>
          <ActionIcon variant="transparent" color="yellow">
            <IconSquarePlus size={20} />
          </ActionIcon> */}

          <TextInput
            placeholder="Aa"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            radius="xl"
            size="sm"
            style={{ flex: 1 }}
            styles={{
              input: {
                backgroundColor: "#3a4257",
                color: "white",
                border: "none",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.5)",
                },
              },
            }}
          />
          {/* 
          <ActionIcon variant="transparent" color="yellow">
            <IconMoon size={20} />
          </ActionIcon> */}
          <ActionIcon
            variant="transparent"
            color="yellow"
            onClick={handleSendMessage}
            disabled={!isConnected}
          >
            <IconSend size={20} />
          </ActionIcon>
        </Group>
      </Box>
    </Paper>
  );
}
