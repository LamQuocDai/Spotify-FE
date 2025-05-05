import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import Search from "../Search/Search";
import { getUsersService, searchUsers, deleteUserService } from "../../../services/UserService";

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async (pageNum = page, query = searchQuery) => {
    setIsLoading(true);
    try {
      const response = query.trim()
        ? await searchUsers(query, pageNum, size)
        : await getUsersService(pageNum, size);
      
      // Handle API response structure: { status, message, data: [...] }
      const userData = response.data.data || [];
      setUsers(userData);
      
      
      // Calculate total pages
      setTotalPages(Math.ceil(userData.length / size) || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleEnter = (query) => {
    fetchUsers(1, query);
  };

  const handleDeleteUser = (userId) => {
    openDeleteModal(userId);
  };

  const openDeleteModal = (userId) =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete User</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete this user?</Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deleteUserService(userId);
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        } finally {
          setIsLoading(false);
        }
      },
    });

  const openDeleteModalMultiple = () =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete selected users</Text>,
      children: (
        <>
          <Text size="md">
            Are you sure you want to delete {selectedUsers.length} user(s)?
          </Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete users", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await Promise.all(selectedUsers.map((id) => deleteUserService(id)));
          setSelectedUsers([]);
          fetchUsers();
        } catch (error) {
          console.error("Error deleting users:", error);
        }
      },
    });

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
            onEnter={handleEnter}
          />
          <Group>
            {selectedUsers.length > 0 && (
              <Button
                variant="light"
                color="red"
                radius="md"
                onClick={openDeleteModalMultiple}
              >
                <IconTrashX width={18} height={18} />
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
          handleDeleteUser={handleDeleteUser}
        />
      </div>
    </>
  );
};

export default User;