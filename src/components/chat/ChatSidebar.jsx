import { useState, useEffect, useContext } from "react";
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
  Loader,
  Tabs,
  Button,
} from "@mantine/core";
import {
  IconSearch,
  IconX,
  IconUserPlus,
  IconMessages,
} from "@tabler/icons-react";
import {
  getChatsService,
  searchUsersService,
  createChatService,
} from "../../services/chatService";
import { AuthContext } from "../../context/auth/authContext";

// Fallback mock users in case no users prop is provided
const MOCK_USERS = [
  {
    id: 1,
    name: "Try Hard CaoT",
    status: "online",
    unread: 4,
    lastMessage: "Đang hoạt động",
  },
  {
    id: 2,
    name: "Chong Jong Cho",
    status: "offline",
    unread: 0,
    lastMessage: "tôi đang ở thành máy",
  },
  {
    id: 3,
    name: "David Miller",
    status: "online",
    unread: 2,
    lastMessage: "Hey, how are you?",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    status: "away",
    unread: 0,
    lastMessage: "Let's catch up later",
  },
  {
    id: 5,
    name: "Michael Brown",
    status: "online",
    unread: 0,
    lastMessage: "Thanks for the help!",
  },
  {
    id: 6,
    name: "Emily Wilson",
    status: "offline",
    unread: 0,
    lastMessage: "See you tomorrow",
  },
];

export default function ChatSidebar({
  isOpen,
  onClose,
  onSelectChat,
  users = null,
}) {
  const [activeTab, setActiveTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch chats when component mounts or when sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchUserChats();
    }
  }, [isOpen]);

  const fetchUserChats = async () => {
    try {
      setLoading(true);
      const response = await getChatsService();

      if (response && response.status === 200 && response.data) {
        // Transform the API response to match the expected format for the UI
        const formattedChats = response.data.map((chatUser) => {
          return {
            id:
              chatUser.id ||
              `user-${chatUser.username}-${Math.random()
                .toString(36)
                .substr(2, 9)}`, // Ensure unique ID
            name: chatUser.username || "Unknown User",
            status: "offline", // Default status as we don't have this info
            unread: 0, // Default unread count as we don't have this info
            lastMessage: "", // No last message info in the data
            avatar: chatUser.image || null,
            userId: chatUser.id, // Store the user ID for chat connections
          };
        });
        setChats(formattedChats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setError("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  // Search for users to chat with
  const handleSearchUsers = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);

      const response = await searchUsersService(searchQuery);
      console.log("Search response:", response);
      if (response && response.data) {
        // Format search results similar to existing chats format
        const formattedResults = response.data.map((user) => ({
          id: user.id,
          name: user.username || user.name || "User",
          status: user.is_online ? "online" : "offline",
          avatar: user.avatar || null,
          userId: user.id,
        }));
        setSearchResults(formattedResults);
      }
    } catch (error) {
      console.error("Error searching for users:", error);
      setSearchError("Failed to search users");
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle starting a new chat
  const handleStartNewChat = async (selectedUser) => {
    try {
      setLoading(true);
      // Create new chat with selected user
      const response = await createChatService(selectedUser.userId);

      if (response && response.data) {
        // Refresh chats list
        await fetchUserChats();

        // Select this chat and switch to chats tab
        onSelectChat(selectedUser);
        setActiveTab("chats");
        setSearchQuery("");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
      // Create a temporary chat object to open the chat even if API fails
      onSelectChat(selectedUser);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchUsers();
  };

  // Use provided users prop or fetched chats, with mock data as last fallback
  const displayUsers = users || chats.length > 0 ? chats : MOCK_USERS;

  const filteredUsers = displayUsers.filter((user) =>
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
      <Box
        p="md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title order={4} style={{ color: "white" }}>
          Messages
        </Title>
        <ActionIcon onClick={onClose} variant="transparent" color="white">
          <IconX size={20} />
        </ActionIcon>
      </Box>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="outline"
        radius="md"
        px="md"
        styles={{
          tabsList: {
            borderColor: "#3a4257",
          },
          tab: {
            color: "white",
            "&[data-active]": {
              color: "#0084ff",
              borderColor: "#0084ff",
            },
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="chats" leftSection={<IconMessages size={16} />}>
            Chats
          </Tabs.Tab>
          <Tabs.Tab value="new" leftSection={<IconUserPlus size={16} />}>
            New Chat
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Box px="md" pb="md" mt="md">
        {activeTab === "chats" ? (
          <TextInput
            placeholder="Search chats"
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
        ) : (
          <form onSubmit={handleSearchSubmit}>
            <Group gap="xs">
              <TextInput
                placeholder="Search for users"
                value={searchQuery}
                onChange={handleSearchChange}
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
                  root: {
                    flexGrow: 1,
                  },
                }}
              />
              <Button
                variant="filled"
                color="#0084ff"
                size="sm"
                type="submit"
                loading={searchLoading}
              >
                Search
              </Button>
            </Group>
          </form>
        )}
      </Box>

      <ScrollArea style={{ flex: 1 }} p="md">
        {activeTab === "chats" ? (
          // Existing chats list
          loading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Loader color="white" />
            </Box>
          ) : error ? (
            <Text size="sm" style={{ color: "white", textAlign: "center" }}>
              {error}
            </Text>
          ) : (
            <Stack gap="sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
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
                    onClick={() =>
                      onSelectChat({ ...user, otherUserId: user.userId })
                    }
                    _hover={{ backgroundColor: "#3a4257" }}
                  >
                    <Group gap="sm" style={{ position: "relative" }}>
                      <Box style={{ position: "relative" }}>
                        <Avatar
                          size="md"
                          src={
                            user.avatar || "/placeholder.svg?height=48&width=48"
                          }
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
                ))
              ) : (
                <Text size="sm" style={{ color: "white", textAlign: "center" }}>
                  No chats found
                </Text>
              )}
            </Stack>
          )
        ) : // Search results / new chat section
        searchLoading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Loader color="white" />
          </Box>
        ) : searchError ? (
          <Text size="sm" style={{ color: "white", textAlign: "center" }}>
            {searchError}
          </Text>
        ) : searchResults.length > 0 ? (
          <Stack gap="sm">
            {searchResults.map((result) => (
              <Box
                key={result.id}
                p="xs"
                style={{
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  transition: "background-color 0.2s",
                }}
                onClick={() => handleStartNewChat(result)}
                _hover={{ backgroundColor: "#3a4257" }}
              >
                <Group gap="sm">
                  <Box style={{ position: "relative" }}>
                    <Avatar
                      size="md"
                      src={
                        result.avatar || "/placeholder.svg?height=48&width=48"
                      }
                      alt={`${result.name} avatar`}
                    />
                    {result.status === "online" && (
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
                  </Box>
                  <Box>
                    <Text size="sm" fw={600} style={{ color: "white" }}>
                      {result.name}
                    </Text>
                  </Box>
                </Group>
              </Box>
            ))}
          </Stack>
        ) : searchQuery ? (
          <Text size="sm" style={{ color: "white", textAlign: "center" }}>
            No users found. Try a different search.
          </Text>
        ) : (
          <Text size="sm" style={{ color: "white", textAlign: "center" }}>
            Search for users to start a new chat
          </Text>
        )}
      </ScrollArea>
    </Paper>
  );
}
