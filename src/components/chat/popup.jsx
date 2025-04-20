"use client";

import { useState } from "react";
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

export default function ChatPopup({ chat, onClose, onMinimize, position = 0 }) {
  const [messages, setMessages] = useState(chat.messages || [
    {
      id: 1,
      sender: chat.name,
      content: "Portfolio 5d chuyên cần",
      timestamp: "",
      isUser: false,
    },
    {
      id: 2,
      sender: chat.name,
      content: "là mình đx 5 r hả a",
      timestamp: "",
      isUser: false,
    },
    {
      id: 3,
      sender: chat.name,
      content: "tôi đang ở thành máy",
      timestamp: "08:50",
      isUser: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: inputValue,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isUser: true,
        },
      ]);
      setInputValue("");
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
                backgroundColor: chat.status === "online" ? "#4CAF50" : 
                                chat.status === "away" ? "#FFC107" : "#9E9E9E",
                borderRadius: "50%",
                border: "2px solid #242f4b",
              }}
            />
          </Box>
          <Box>
            <Text size="sm" fw={600}>
              {chat.name}
            </Text>
            <Text size="xs" c="gray.3">
              {chat.status === "online" ? "Đang hoạt động" : 
               chat.status === "away" ? "Away" : "Offline"}
            </Text>
          </Box>
        </Group>

        <Group gap="md">
          <ActionIcon variant="transparent" color="yellow">
            <IconPhone size={20} />
          </ActionIcon>
          <ActionIcon variant="transparent" color="white">
            <IconVideo size={20} />
          </ActionIcon>
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
          <ActionIcon variant="transparent" color="yellow">
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
          </ActionIcon>

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

          <ActionIcon variant="transparent" color="yellow">
            <IconMoon size={20} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            color="yellow"
            onClick={handleSendMessage}
          >
            <IconSend size={20} />
          </ActionIcon>
        </Group>
      </Box>
    </Paper>
  );
}
