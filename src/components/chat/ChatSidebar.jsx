import { useState } from "react";
import {
  Box,
  TextInput,
  ActionIcon,
  Stack,
  Title,
  Paper,
  Avatar,
  Group,
  Text,
  ScrollArea,
  Badge,
} from "@mantine/core";
import { IconSearch, IconX, IconMessage } from "@tabler/icons-react";

const MOCK_USERS = [
  { id: 1, name: "Try Hard CaoT", status: "online", unread: 4, lastMessage: "Đang hoạt động" },
  { id: 2, name: "Chong Jong Cho", status: "offline", unread: 0, lastMessage: "tôi đang ở thành máy" },
  { id: 3, name: "David Miller", status: "online", unread: 2, lastMessage: "Hey, how are you?" },
  { id: 4, name: "Sarah Johnson", status: "away", unread: 0, lastMessage: "Let's catch up later" },
  { id: 5, name: "Michael Brown", status: "online", unread: 0, lastMessage: "Thanks for the help!" },
  { id: 6, name: "Emily Wilson", status: "offline", unread: 0, lastMessage: "See you tomorrow" },
];

export default function ChatSidebar({ isOpen, onClose, onSelectChat }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(MOCK_USERS);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      shadow="md"
      radius="md"
      style={{
        height: "calc(100vh - 100px)",
        width: isOpen ? "300px" : "0px",
        position: "fixed",
        right: isOpen ? "0" : "-300px",
        top: "70px",
        transition: "all 0.3s ease-in-out",
        zIndex: 1000,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#242f4b",
      }}
    >
      <Box p="md" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title order={4} style={{ color: "white" }}>Messages</Title>
        <ActionIcon onClick={onClose} variant="transparent" color="white">
          <IconX size={20} />
        </ActionIcon>
      </Box>

      <Box px="md" pb="md">
        <TextInput
          placeholder="Search people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          radius="md"
          icon={<IconSearch size={16} />}
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
      </Box>

      <ScrollArea style={{ flex: 1 }} p="md">
        <Stack gap="sm">
          {filteredUsers.map((user) => (
            <Box
              key={user.id}
              p="xs"
              style={{
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0.2s",
                position: "relative",
              }}
              onClick={() => onSelectChat(user)}
              _hover={{ backgroundColor: "#3a4257" }}
            >
              <Group gap="sm" style={{ position: "relative" }}>
                <Box style={{ position: "relative" }}>
                  <Avatar
                    size="md"
                    src="/placeholder.svg?height=48&width=48"
                    alt={`${user.name} avatar`}
                  />
                  {user.status === "online" && (
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        backgroundColor: "#4CAF50",
                        borderRadius: "50%",
                        border: "2px solid #242f4b",
                      }}
                    />
                  )}
                  {user.status === "away" && (
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        backgroundColor: "#FFC107",
                        borderRadius: "50%",
                        border: "2px solid #242f4b",
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Text size="sm" fw={600} style={{ color: "white" }}>
                    {user.name}
                  </Text>
                  <Text size="xs" style={{ color: "#9DA7BE" }}>
                    {user.lastMessage}
                  </Text>
                </Box>
                {user.unread > 0 && (
                  <Badge
                    color="red"
                    size="sm"
                    radius="xl"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      minWidth: "24px",
                    }}
                  >
                    {user.unread}
                  </Badge>
                )}
              </Group>
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Paper>
  );
}