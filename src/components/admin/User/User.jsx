import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals"; // Add missing import
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import UserTable from "./UserTable";
import Search from "../Search/Search";
import {
  getUsersService,
  searchUsers,
  deleteUserService,
} from "../../../services/UserService";

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async (pageNum = page, query = searchQuery) => {
    setIsLoading(true);
    try {
      const response = query.trim()
        ? await searchUsers(query, pageNum, pageSize)
        : await getUsersService(pageNum, pageSize);
      console.log("API Response:", response);
      setUsers(response.data.users || []);
      setTotalPages(response.data.total_pages || 1);
      if (query.trim() && response.data.users.length === 0) {
        notifications.show({
          title: "No Results",
          message: `No users found for query "${query}"`,
          color: "yellow",
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalPages(1);
      notifications.show({
        title: "Error",
        message: error.message || "Failed to fetch users",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    console.log("Search Query:", query); // Add for debugging
    setSearchQuery(query);
    setPage(1);
  };

  const handleDeleteMultiple = async () => {
    if (selectedUsers.length === 0) return;

    modals.openConfirmModal({
      title: <Text size="xl">Delete selected users</Text>,
      children: (
        <>
          <Text size="md">
            Are you sure you want to delete {selectedUsers.length} user(s)?
          </Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to
            restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete users", cancel: "Cancel" },
      confirmProps: { color: "red", loading: isLoading },
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await Promise.all(selectedUsers.map((id) => deleteUserService(id)));
          setSelectedUsers([]);
          await fetchUsers(page);
          notifications.show({
            title: "Success",
            message: "Users deleted successfully",
            color: "green",
          });
        } catch (error) {
          notifications.show({
            title: "Error",
            message: error.message || "Failed to delete users",
            color: "red",
          });
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32} className="text-[#1db954]">
        Users
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <Group justify="space-between" mb={24}>
          <Search
            placeholder="Search users"
            value={searchQuery}
            onSearch={handleSearch}
          />
          <Group>
            {selectedUsers.length > 0 && (
              <Button
                variant="light"
                color="red"
                radius="md"
                onClick={handleDeleteMultiple}
                leftSection={<IconTrashX width={18} height={18} />}
              >
                Delete Selected
              </Button>
            )}
            <Link to="/admin/users/create">
              <Button
                leftSection={<IconPlus />}
                variant="filled"
                color="#1db954"
                radius="md"
              >
                Create user
              </Button>
            </Link>
          </Group>
        </Group>

        <UserTable
          users={users}
          fetchUsers={fetchUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default User;
