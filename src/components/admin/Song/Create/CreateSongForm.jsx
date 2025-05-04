import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  TextInput,
  Title,
  Select,
  FileInput,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createSong, getAllGenres } from "../../../../services/SongsService";
import { notifications } from "@mantine/notifications";

const CreateSongForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      song_name: "",
      singer_name: "",
      genre_id: "",
      audio_file: null,
      image_file: null,
      video_file: null,
  });

  // Lấy danh sách genres
  useEffect(() => {
      const fetchGenres = async () => {
          try {
              const response = await getAllGenres();
              setGenres(response.data.map(genre => ({
                  value: genre.id,
                  label: genre.name
              })));
          } catch (error) {
              console.error("Error fetching genres:", error);
              notifications.show({
                  title: "Error",
                  message: "Failed to load genres",
                  color: "red",
              });
          }
      };
      fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          await createSong(formData);
          notifications.show({
              title: "Success",
              message: "Song created successfully",
              color: "green",
          });
          navigate("/admin/songs");
      } catch (error) {
          console.error("Error creating song:", error);
          notifications.show({
              title: "Error",
              message: error.response?.status === 403
                  ? "You do not have permission to create this song"
                  : "Failed to create song",
              color: "red",
          });
      } finally {
          setIsLoading(false);
      }
  };

  const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
      <>
          <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Title order={1} mt={32} className="text-[#1db954]">
              Create Song
          </Title>

          <div className="bg-white p-8 rounded-lg mt-7">
              <form onSubmit={handleSubmit}>
                  <Group justify="space-between" grow>
                      <Flex direction="column" gap={20}>
                          <TextInput
                              label="Song Name"
                              size="md"
                              value={formData.song_name}
                              onChange={(e) => handleInputChange("song_name", e.target.value)}
                              placeholder="Enter song title"
                              required
                          />

                          <TextInput
                              label="Singer Name"
                              size="md"
                              value={formData.singer_name}
                              onChange={(e) => handleInputChange("singer_name", e.target.value)}
                              placeholder="Enter singer name"
                              required
                          />

                          <Select
                              label="Genre"
                              size="md"
                              value={formData.genre_id}
                              onChange={(value) => handleInputChange("genre_id", value)}
                              placeholder="Select genre"
                              data={genres}
                              allowDeselect={false}
                              required
                          />
                      </Flex>

                      <Flex direction="column" gap={20}>
                          <FileInput
                              label="Audio File"
                              size="md"
                              accept="audio/mp3,audio/mp4,audio/wav"
                              onChange={(file) => handleInputChange("audio_file", file)}
                              placeholder="Upload audio file"
                              required
                          />
                          <FileInput
                              label="Image File"
                              size="md"
                              accept="image/jpeg,image/jpg,image/png"
                              onChange={(file) => handleInputChange("image_file", file)}
                              placeholder="Upload image file"
                          />
                          <FileInput
                              label="Video File"
                              size="md"
                              accept="video/mp4,video/mov,video/avi"
                              onChange={(file) => handleInputChange("video_file", file)}
                              placeholder="Upload video file"
                          />
                      </Flex>
                  </Group>

                  <Group mt={32} justify="flex-end">
                      <Link to="/admin/songs">
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

export default CreateSongForm;