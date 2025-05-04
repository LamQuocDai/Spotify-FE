import {
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Title,
  Text
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createGenre } from "../../../../services/genresService";
import { notifications } from "@mantine/notifications";
import { openModal } from "@mantine/modals";

const CreateGenreForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: " " });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createGenre(formData);
      openModal({
        title: "Success",
        children: <Text>Genre created successfully</Text>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
      navigate("/admin/genres");
    } catch (e) {
      console.error("Error creating genre: ", e);
      openModal({
        title: "Error",
        children: <Text>Failed to create genre</Text>,
        centered: true,
        size: "sm",
        overlayProps: { opacity: 0.55, blur: 3 },
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        Create Genre
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

export default CreateGenreForm;