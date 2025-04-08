import {
    Table,
    Checkbox,
    Group,
    ActionIcon,
    Text,
  } from "@mantine/core";
  import { IconEdit, IconTrash } from "@tabler/icons-react";
  import { Link } from "react-router-dom";
  
  const mockGenres = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
  ];
  
  const GenreTable = () => {
    const rows = mockGenres.map((genre) => (
      <Table.Tr key={genre.id}>
        <Table.Td>
          <Checkbox />
        </Table.Td>
        <Table.Td>{genre.name}</Table.Td>
        <Table.Td>
          <Group gap={6}>
            <Link to={`/admin/genres/update`}>
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
            <Table.Th>Genre Name</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    );
  };
  
  export default GenreTable;
  