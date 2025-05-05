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

  const openDeleteModal = (id) =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete user</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete this user?</Text>
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
          fetchUsers(page); // gọi lại trang hiện tại sau khi xóa
        } catch (error) {
          console.error("Error deleting user:", error);
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
        />
      </Table.Td>
      <Table.Td>
        {user.image ? (
          <Avatar size="sm" src={user.image} alt="User Image" />
        ) : (
          <Avatar size="sm" />
        )}
      </Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.first_name}</Table.Td>
      <Table.Td>{user.last_name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone}</Table.Td>
      <Table.Td>{user.genre}</Table.Td>
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
          {user.status}
        </span>
      </Table.Td>
      <Table.Td>
        <Group gap={6}>
          <Link to={`/admin/users/update/${user.id}`}>
            <ActionIcon variant="transparent" color="yellow" radius="xl">
              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <ActionIcon
            variant="transparent"
            color="red"
            radius="xl"
            onClick={() => openDeleteModal(user.id)}
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
              />
            </Table.Th>
            <Table.Th />
            <Table.Th>Username</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Genre</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
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
          position="right"
        />
      )}
    </>
  );
};

export default UserTable;
