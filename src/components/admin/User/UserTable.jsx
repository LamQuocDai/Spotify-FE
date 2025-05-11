import {
  Table,
  Checkbox,
  Avatar,
  Group,
  ActionIcon,
  Text,
  Pagination,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUserService } from "../../../services/UserService";
import { modals } from "@mantine/modals";
import clsx from "clsx";
import { notifications } from "@mantine/notifications";

const UserTable = ({
  users,
  fetchUsers,
  selectedUsers,
  setSelectedUsers,
  page,
  setPage,
  totalPages,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  console.log("Users in UserTable:", users); // For debugging

  const openDeleteModal = (id, username) =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete user</Text>,
      children: (
        <>
          <Text size="md">
            Are you sure you want to delete user "{username}"?
          </Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible.
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red", loading: loadingDelete },
      onConfirm: async () => {
        setLoadingDelete(true);
        try {
          await deleteUserService(id);
          fetchUsers(page);
          notifications.show({
            title: "Success",
            message: "User deleted successfully",
            color: "green",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          notifications.show({
            title: "Error",
            message: error.message || "Failed to delete user",
            color: "red",
          });
        } finally {
          setLoadingDelete(false);
        }
      },
    });

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Checkbox
          checked={selectedUsers.includes(user.id)}
          onChange={() => handleSelect(user.id)}
          aria-label={`Select user ${user.username}`}
        />
      </Table.Td>
      <Table.Td>
        <Avatar
          size="sm"
          src={user.image}
          alt={`Profile image of ${user.username}`}
        />
      </Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone || "-"}</Table.Td>
      <Table.Td>{user.gender || "-"}</Table.Td>
      <Table.Td>
        <span
          className={clsx(
            "py-1 px-[6px] flex justify-center items-center max-w-16 rounded text-white text-sm",
            {
              "bg-red-600": user.status === "banned",
              "bg-green-600": user.status === "active",
              "bg-yellow-400 text-black": user.status === "unavailable",
            }
          )}
        >
          {user.status || "unknown"}
        </span>
      </Table.Td>
      <Table.Td>
        <Group gap={6}>
          <Link to={`/admin/users/update/${user.id}`}>
            <ActionIcon
              variant="transparent"
              color="yellow"
              radius="xl"
              aria-label={`Edit user ${user.username}`}
            >
              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <ActionIcon
            variant="transparent"
            color="red"
            radius="xl"
            onClick={() => openDeleteModal(user.id, user.username)}
            aria-label={`Delete user ${user.username}`}
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
                onChange={() =>
                  setSelectedUsers(
                    selectedUsers.length === users.length
                      ? []
                      : users.map((u) => u.id)
                  )
                }
                aria-label="Select all users"
              />
            </Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={8}>
                <Text align="center" c="dimmed">
                  No users found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination
          value={page}
          onChange={(newPage) => {
            setPage(newPage);
            fetchUsers(newPage);
          }}
          total={totalPages}
          mt="md"
          withEdges
        />
      )}
    </>
  );
};

export default UserTable;
