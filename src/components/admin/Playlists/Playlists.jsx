import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import PlaylistTable from "./PlaylistTable";
import Search from "../Search/Search";

const Playlist = () => {
  const isLoading = false;
  const selectedPlaylists = [];

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete playlists</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete selected playlists?</Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible.
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
    });

  return (
    <>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title order={1} mt={32} className="text-[#1db954]">Playlists</Title>
      <div className="bg-white p-8 rounded-lg mt-7">
        <Group justify="space-between" mb={24}>
          <Search placeholder="Search playlists" />
          <Group>
            {selectedPlaylists.length > 0 && (
              <Button variant="light" color="red" radius="md" onClick={openDeleteModal}>
                <IconTrashX width={18} height={18} />
              </Button>
            )}
            <Link to="/admin/playlists/create">
              <Button leftSection={<IconPlus />} variant="filled" color="#1db954" radius="md">
                Create playlist
              </Button>
            </Link>
          </Group>
        </Group>

        <PlaylistTable
          playlists={[]} fetchPlaylists={() => {}} sortBy={null} order="asc"
          setIsLoading={() => {}} selectedPlaylists={[]} setSelectedPlaylists={() => {}}
          handleSort={() => {}} size={10} setSize={() => {}}
        />
      </div>
    </>
  );
};

export default Playlist;
