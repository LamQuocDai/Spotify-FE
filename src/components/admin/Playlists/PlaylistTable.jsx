import {
  Table,
  Checkbox,
  Group,
  ActionIcon,
  Text,
  Pagination,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const PlaylistTable = ({
  playlists,
  fetchPlaylists,
  selectedPlaylists,
  setSelectedPlaylists,
  page,
  setPage,
  totalPages,
  handleDeletePlaylist,
}) => {
  const rows = playlists && playlists.length > 0 ? playlists.map((playlist) => (
    <Table.Tr key={playlist.id}>
      <Table.Td>
        <Checkbox
          checked={selectedPlaylists.includes(playlist.id)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedPlaylists((prev) =>
              checked
                ? [...prev, playlist.id]
                : prev.filter((id) => id !== playlist.id)
            );
          }}
        />
      </Table.Td>
      <Table.Td>{playlist.title}</Table.Td>
      <Table.Td>{playlist.description}</Table.Td>
      <Table.Td>{playlist.create_date || new Date().toISOString().split('T')[0]}</Table.Td>
      <Table.Td>{playlist.user?.username}</Table.Td>
      <Table.Td>
        <Group gap={6}>
          <Link to={`/admin/playlists/update/${playlist.id}`}>
            <ActionIcon variant="transparent" color="yellow" radius="xl">
              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <ActionIcon
            variant="transparent"
            color="red"
            radius="xl"
            onClick={() => handleDeletePlaylist(playlist.id)}
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  )) : [];

  return (
    <div>
      <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                checked={selectedPlaylists.length === playlists.length && playlists.length > 0}
                onChange={() =>
                  setSelectedPlaylists(
                    selectedPlaylists.length === playlists.length ? [] : playlists.map((p) => p.id)
                  )
                }
              />
            </Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {totalPages > 1 && (
        <Group justify="center" mt="md">
          <Pagination
            total={totalPages}
            value={page}
            onChange={(newPage) => {
              setPage(newPage);
              fetchPlaylists(newPage);
            }}
            color="#1db954"
          />
        </Group>
      )}
    </div>
  );
};

export default PlaylistTable;