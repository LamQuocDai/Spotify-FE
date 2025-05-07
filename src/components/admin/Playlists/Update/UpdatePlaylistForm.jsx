import {
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlaylistByIdService, updatePlaylistService } from "../../../../services/playlistService";
import { notifications } from "@mantine/notifications";

const UpdatePlaylistForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: ""});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPlaylist = async () => {
      setIsLoading(true);
      try {
        const response = await getPlaylistByIdService(id, formData);
        
        setFormData({ title: response.data.title, description: response.data.description});
      } catch (e) {
        console.error("Error fetching playlist: ", e);
        notifications.show({
          title: "Error",
          message: "Failed to load playlist",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updatePlaylistService(id, formData);
      notifications.show({
        title: "Success",
        message: "Playlist updated successfully",
        color: "green",
      });
      navigate("/admin/playlists");
    } catch (e) {
      console.error("Error updating playlist: ", e);
      notifications.show({
        title: "Error",
        message: "Failed to update playlist",
        color: "red",
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
        Update Playlist
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

export default UpdatePlaylistForm;