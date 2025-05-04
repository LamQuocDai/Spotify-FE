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

const GenreTable = ({
  genres,
  fetchGenres,
  selectedGenres,
  setSelectedGenres,
  page,
  setPage,
  totalPages,
  handleDeleteGenre,
}) => {
  const rows = genres && genres.length > 0 ? genres.map((genre) => (
    <Table.Tr key={genre.id}>
      <Table.Td>
        <Checkbox
          checked={selectedGenres.includes(genre.id)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedGenres((prev) =>
              checked
                ? [...prev, genre.id]
                : prev.filter((id) => id !== genre.id)
            );
          }}
        />
      </Table.Td>
      <Table.Td>{genre.name}</Table.Td>
      <Table.Td>
        <Group gap={6}>
          <Link to={`/admin/genres/update/${genre.id}`}>
            <ActionIcon variant="transparent" color="yellow" radius="xl">
              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Link>
          <ActionIcon
            variant="transparent"
            color="red"
            radius="xl"
            onClick={() => handleDeleteGenre(genre.id)}
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
                checked={selectedGenres.length === genres.length && genres.length > 0}
                onChange={() =>
                  setSelectedGenres(
                    selectedGenres.length === genres.length ? [] : genres.map((g) => g.id)
                  )
                }
              />
            </Table.Th>
            <Table.Th>Genre Name</Table.Th>
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
              fetchGenres(newPage);
            }}
            color="#1db954"
          />
        </Group>
      )}
    </div>
  );
};

export default GenreTable;