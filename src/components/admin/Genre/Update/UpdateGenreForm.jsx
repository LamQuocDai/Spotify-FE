import {
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGenreById, updateGenre } from "../../../../services/genresService";
import { notifications } from "@mantine/notifications";

const UpdateGenreForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const response = await getGenreById(id);
        setFormData({ name: response.data.name });
      } catch (e) {
        console.error("Error fetching genre: ", e); // Sửa từ "error" thành "e"
        notifications.show({
          title: "Error",
          message: "Failed to load genre",
          color: "red"
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchGenres();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateGenre(id, formData);
      notifications.show({
        title: "Success",
        message: "Genre updated successfully",
        color: "green"
      });
      navigate("/admin/genres");
    } catch (e) {
      console.error("Error updating genre: ", e);
      notifications.show({
        title: "Error",
        message: "Failed to update genre",
        color: "red"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setFormData({ name: e.target.value });
  }

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32}>
        Update Genre
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Genre Name"
            size="md"
            value={formData.name}
            placeholder="Enter genre name"
            onChange={handleInputChange}
            required
          />

          <Group mt={32} justify="flex-end">
            <Link to="/admin/genres">
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

export default UpdateGenreForm;