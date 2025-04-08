import { Button, Group, LoadingOverlay, TextInput, Textarea, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const CreatePlaylistForm = () => {
  const isLoading = false;

  return (
    <>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title order={1} mt={32}>Create Playlist</Title>
      <div className="bg-white p-8 rounded-lg mt-7">
        <form>
          <TextInput label="Title" size="md" placeholder="Enter playlist title" required />
          <Textarea label="Description" size="md" mt={20} placeholder="Enter playlist description" />
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

export default CreatePlaylistForm;
