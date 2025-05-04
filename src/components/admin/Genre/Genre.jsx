import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { modals } from "@mantine/modals";
import GenreTable from "./GenreTable";
import Search from "../../../utils/search";
import { useEffect, useState } from "react";
import { deleteGenre, getAllGenres, searchGenres } from "../../../services/genresService";

const Genre = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGenres = async (pageNum = page, query = searchQuery) => {
    setIsLoading(true);
    try {
      const response = query
        ? await searchGenres(query, pageNum, size)
        : await getAllGenres(pageNum, size);
      setGenres(response.data.results || response.data);
      setTotalPages(Math.ceil(response.data.length) / size);
    } catch (e) {
      console.error("Error fetching genres: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [page, searchQuery]);

  const openDeleteModal = (genreId) =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete Genre</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete this genre?</Text>
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
          await deleteGenre(genreId);
          fetchGenres();
        } catch (error) {
          console.error("Error deleting genre:", error);
        } finally {
          setIsLoading(false);
        }
      },
    });

  const handleDeleteGenre = (genreId) => {
    openDeleteModal(genreId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };
  
  const handleEnter = (query) => {
    fetch(1, query);
  };

  const openDeleteModalMultiple = () =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete genres</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete selected genres?</Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete genres", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await Promise.all(selectedGenres.map((id) => deleteGenre(id)));
          setSelectedGenres([]);
          fetchGenres();
        } catch (error) {
          console.error("Error deleting genres:", error);
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title order={1} mt={32} className="text-[#1db954]">
        Genres
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <Group justify="space-between" mb={24}>
          <Search
            placeholder="Search genres"
            value={searchQuery}
            onSearch={handleSearch}
            onEnter={handleEnter}
          />

          <Group>
            {selectedGenres.length > 0 && (
              <Button
                variant="light"
                color="red"
                radius="md"
                onClick={openDeleteModalMultiple}
              >
                <IconTrashX width={18} height={18} />
              </Button>
            )}
            <Link to="/admin/genres/create">
              <Button
                leftSection={<IconPlus />}
                variant="filled"
                color="#1db954"
                radius="md"
              >
                Create genre
              </Button>
            </Link>
          </Group>
        </Group>

        <GenreTable
          genres={genres}
          fetchGenres={fetchGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          handleDeleteGenre={handleDeleteGenre} 
        />
      </div>
    </>
  );
};

export default Genre;