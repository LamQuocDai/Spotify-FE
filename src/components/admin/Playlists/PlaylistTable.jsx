import { Table, Checkbox, Group, ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const mockPlaylists = [
  {
    id: 1,
    title: "Chill Vibes",
    description: "Relax and enjoy some chill tracks.",
    create_date: "2024-04-01",
  },
  {
    id: 2,
    title: "Workout Mix",
    description: "Energetic songs to get you moving.",
    create_date: "2024-03-20",
  },
];

const PlaylistTable = () => {
  const rows = mockPlaylists.map((playlist) => (
    <Table.Tr key={playlist.id}>
      <Table.Td><Checkbox /></Table.Td>
      <Table.Td>{playlist.title}</Table.Td>
      <Table.Td>{playlist.description}</Table.Td>
      <Table.Td>{playlist.create_date}</Table.Td>
      <Table.Td>
        <Group gap={6}>
          <Link to={`/admin/playlists/update`}>
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
          <Table.Th><Checkbox /></Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default PlaylistTable;
