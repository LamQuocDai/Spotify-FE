import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import PlaylistTable from "./PlaylistTable";
import Search from "../../../utils/search";
import { useEffect, useState } from "react";
import { deletePlaylistService, getPlaylistService, searchAllPlaylistsService } from "../../../services/playlistService";

const Playlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPlaylists = async (pageNum = page, query = searchQuery) => {
    setIsLoading(true);
    try {  
      const response = query
        ? await searchAllPlaylistsService(query, pageNum, size)
        : await getPlaylistService(pageNum, size);

      setPlaylists(response.data.playlists);
      setTotalPages(Math.ceil(response.data.total_playlists / size));
    } catch (e) {
      console.error("Error fetching playlists: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [page, searchQuery]);

  const openDeleteModal = (playlistId) =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete Playlist</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete this playlist?</Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to
            restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deletePlaylistService(playlistId);
          fetchPlaylists();
        } catch (error) {
          console.error("Error deleting playlist:", error);
        } finally {
          setIsLoading(false);
        }
      },
    });

  const handleDeletePlaylist = (playlistId) => {
    openDeleteModal(playlistId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleEnter = () => {
    fetchPlaylists(1, searchQuery);
  };

  const openDeleteModalMultiple = () =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete Playlists</Text>,
      children: (
        <>
          <Text size="md">
            Are you sure you want to delete selected playlists?
          </Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to
            restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete playlists", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await Promise.all(
            selectedPlaylists.map((id) => deletePlaylistService(id))
          );
          setSelectedPlaylists([]);
          fetchPlaylists();
        } catch (error) {
          console.error("Error deleting playlists:", error);
        } finally {
          setIsLoading(false);
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
        Playlists
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <Group justify="space-between" mb={24}>
          <Search
            placeholder="Search playlists"
            value={searchQuery}
            onSearch={handleSearch}
            onEnter={handleEnter}
          />

          <Group>
            {selectedPlaylists.length > 0 && (
              <Button
                variant="light"
                color="red"
                radius="md"
                onClick={openDeleteModalMultiple}
              >
                <IconTrashX width={18} height={18} />
              </Button>
            )}
            <Link to="/admin/playlists/create">
              <Button
                leftSection={<IconPlus />}
                variant="filled"
                color="#1db954"
                radius="md"
              >
                Create playlist
              </Button>
            </Link>
          </Group>
        </Group>

        <PlaylistTable
          playlists={playlists}
          fetchPlaylists={fetchPlaylists}
          selectedPlaylists={selectedPlaylists}
          setSelectedPlaylists={setSelectedPlaylists}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          handleDeletePlaylist={handleDeletePlaylist}
        />
      </div>
    </>
  );
};

export default Playlist;
