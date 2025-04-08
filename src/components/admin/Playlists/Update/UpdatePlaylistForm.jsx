import { Button, Group, LoadingOverlay, TextInput, Textarea, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const UpdatePlaylistForm = () => {
  const isLoading = false;

  const playlist = {
    title: "Chill Vibes",
    description: "Relax and enjoy some chill tracks.",
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title order={1} mt={32}>Update Playlist</Title>
      <div className="bg-white p-8 rounded-lg mt-7">
        <form>
          <TextInput
            label="Title"
            size="md"
            placeholder="Enter playlist title"
            defaultValue={playlist.title}
            required
          />
          <Textarea
            label="Description"
            size="md"
            mt={20}
            placeholder="Enter playlist description"
            defaultValue={playlist.description}
          />
          <Group mt={32} justify="flex-end">
            <Link to="/admin/playlists">
              <Button variant="filled" color="gray">Cancel</Button>
            </Link>
            <Button type="submit" variant="filled" color="#1db954">Save</Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default UpdatePlaylistForm;
