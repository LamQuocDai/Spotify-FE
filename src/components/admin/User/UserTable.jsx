import {
  Table,
  Checkbox,
  Avatar,
  Group,
  ActionIcon,
  Text,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const mockUsers = [
  {
    userId: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    genre: "Male",
    status: "Banned",
    image: null,
  },
  {
    userId: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    genre: "Female",
    status: "Available",
    image: null,
  },
];

const UserTable = () => {
  const rows = mockUsers.map((user) => (
    <Table.Tr key={user.userId}>
      <Table.Td>
        <Checkbox />
      </Table.Td>
      <Table.Td>
        {user.image ? (
          <Avatar size="sm" src={user.image} alt="User Image" />
        ) : (
          <Avatar size="sm" />
        )}
      </Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone}</Table.Td>
      <Table.Td>{user.genre}</Table.Td>
      <Table.Td>
        <span
          className={clsx(
            "py-1 px-[6px] flex justify-center items-center max-w-16 rounded text-white text-sm",
            {
              "bg-red-600": user.status === "Banned",
              "bg-green-600": user.status === "Available",
              "bg-yellow-300-600": user.status === "Unavailable",
            }
          )}
        >
          {user.status}
        </span>
      </Table.Td>
      <Table.Td>
        <Group gap={6}>
          <Link to={`/admin/users/update`}>
            <ActionIcon variant="transparent" color="yellow" radius="xl">
              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Link>

          <ActionIcon variant="transparent" color="red" radius="xl">
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Checkbox />
          </Table.Th>
          <Table.Th />
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone</Table.Th>
          <Table.Th>Genre</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default UserTable;
