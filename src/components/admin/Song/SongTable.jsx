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
  
  const mockSongs = [
    {
      id: 1,
      genre_id: 1,
      user_id: 2,
      singer_name: "Adele",
      song_name: "Hello",
      url: "https://example.com/songs/hello.mp3",
      image: "https://i1.sndcdn.com/artworks-000123456789-abcdef-t500x500.jpg",
    },
    {
      id: 2,
      genre_id: 3,
      user_id: 5,
      singer_name: "Ed Sheeran",
      song_name: "Shape of You",
      url: "https://example.com/songs/shape-of-you.mp3",
      image: null,
    },
  ];
  
  const SongTable = () => {
    const rows = mockSongs.map((song) => (
      <Table.Tr key={song.id}>
        <Table.Td>
          <Checkbox />
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
            {song.url}
          </Text>
        </Table.Td>
        <Table.Td>
          <Group gap={6}>
            <Link to={`/admin/songs/update`}>
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
            <Table.Th>Image</Table.Th>
            <Table.Th>Song Name</Table.Th>
            <Table.Th>Singer</Table.Th>
            <Table.Th>URL</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    );
  };
  
  export default SongTable;
  