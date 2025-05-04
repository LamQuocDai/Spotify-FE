import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import { useState, useEffect } from "react";
import SongTable from "./SongTable";
import Search from "../../../utils/search";
import { getAllSongs, searchSongs, deleteSong } from "../../../services/SongsService";

const Song = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSongs = async (pageNum = page, query = searchQuery) => {
    setIsLoading(true);
    try {
      const response = query.trim()
        ? await searchSongs(query, pageNum, size)
        : await getAllSongs(pageNum, size);
      setSongs(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / size) || 1);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleEnter = (query) => {
    fetchSongs(1, query);
  };

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32} className="text-[#1db954]">
        Songs
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <Group justify="space-between" mb={24}>
          <Search
            placeholder="Search songs"
            value={searchQuery}
            onSearch={handleSearch}
            onEnter={handleEnter}
          />
          <Group>
            {selectedSongs.length > 0 && (
              <Button
                variant="light"
                color="red"
                radius="md"
                onClick={() => {
                  modals.openConfirmModal({
                    title: <Text size="xl">Delete selected songs</Text>,
                    children: (
                      <>
                        <Text size="md">
                          Are you sure you want to delete {selectedSongs.length} song(s)?
                        </Text>
                        <Text mt="sm" c="yellow" fs="italic" size="sm">
                          This action is irreversible.
                        </Text>
                      </>
                    ),
                    labels: { confirm: "Delete", cancel: "Cancel" },
                    confirmProps: { color: "red" },
                    onConfirm: async () => {
                      try {
                        await Promise.all(selectedSongs.map((id) => deleteSong(id)));
                        setSelectedSongs([]);
                        fetchSongs();
                      } catch (error) {
                        console.error("Error deleting songs:", error);
                      }
                    },
                  });
                }}
              >
                <IconTrashX width={18} height={18} />
              </Button>
            )}
            <Link to="/admin/songs/create">
              <Button
                leftSection={<IconPlus />}
                variant="filled"
                color="#1db954"
                radius="md"
              >
                Create song
              </Button>
            </Link>
          </Group>
        </Group>

        <SongTable
          songs={songs}
          fetchSongs={fetchSongs}
          selectedSongs={selectedSongs}
          setSelectedSongs={setSelectedSongs}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Song;