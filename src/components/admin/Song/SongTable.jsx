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
import { deleteSong } from "../../../services/SongsService";
import { modals } from "@mantine/modals";

const SongTable = ({
  songs,
  fetchSongs,
  selectedSongs,
  setSelectedSongs,
  page,
  setPage,
  totalPages,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const openDeleteModal = (id) =>
      modals.openConfirmModal({
          title: <Text size="xl">Delete song</Text>,
          children: (
              <>
                  <Text size="md">Are you sure you want to delete this song?</Text>
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
                  await deleteSong(id);
                  fetchSongs();
              } catch (error) {
                  console.error("Error deleting song:", error);
              } finally {
                  setLoadingDelete(false);
              }
          },
      });

  const handleSelect = (id) => {
      setSelectedSongs((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
  };

  const rows = songs.map((song) => (
      <Table.Tr key={song.id}>
          <Table.Td>
              <Checkbox
                  checked={selectedSongs.includes(song.id)}
                  onChange={() => handleSelect(song.id)}
              />
          </Table.Td>
          <Table.Td>
              {song.image ? (
                  <Avatar size="sm" src={song.image} alt="Song Image" />
              ) : (
                  <Avatar size="sm" />
              )}
          </Table.Td>
          <Table.Td>{song.song_name}</Table.Td>
          <Table.Td>{song.singer_name}</Table.Td>
          <Table.Td>
              <Text size="sm" color="dimmed" truncate="end" maw={200}>
                  {song.url_audio}
              </Text>
          </Table.Td>
          <Table.Td>
              <Group gap={6}>
                  <Link to={`/admin/songs/update/${song.id}`}>
                      <ActionIcon variant="transparent" color="yellow" radius="xl">
                          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
                      </ActionIcon>
                  </Link>
                  <ActionIcon
                      variant="transparent"
                      color="red"
                      radius="xl"
                      onClick={() => openDeleteModal(song.id)}
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
                              checked={selectedSongs.length === songs.length && songs.length > 0}
                              onChange={() =>
                                  setSelectedSongs(
                                      selectedSongs.length === songs.length ? [] : songs.map((s) => s.id)
                                  )
                              }
                          />
                      </Table.Th>
                      <Table.Th>Image</Table.Th>
                      <Table.Th>Song Name</Table.Th>
                      <Table.Th>Singer</Table.Th>
                      <Table.Th>Audio URL</Table.Th>
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
                      fetchSongs(newPage);
                  }}
                  total={totalPages}
                  mt="md"
                  position="right"
              />
          )}
      </>
  );
};

export default SongTable;