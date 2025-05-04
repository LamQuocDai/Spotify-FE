import {
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Textarea,
  Title,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPlaylistService } from "../../../../services/playlistService";
import { modals } from "@mantine/modals";

const CreatePlaylistForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createPlaylistService(formData);
      modals.open({
        title: "Success",
        children: <Text>Playlist created successfully</Text>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
      navigate("/admin/playlists");
    } catch (e) {
      console.error("Error creating playlist: ", e);
      modals.open({
        title: "Error",
        children: <Text>Failed to create playlist</Text>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32}>
        Create Playlist
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            name="title"
            size="md"
            value={formData.title}
            placeholder="Enter playlist title"
            onChange={handleInputChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            size="md"
            mt={20}
            value={formData.description}
            placeholder="Enter playlist description"
            onChange={handleInputChange}
          />

          <Group mt={32} justify="flex-end">
            <Link to="/admin/playlists">
              <Button variant="filled" color="gray">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="filled" color="#1db954">
              Save
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default CreatePlaylistForm;