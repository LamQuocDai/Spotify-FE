import {
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Select,
  TextInput,
  Title,
  FileInput,
  Text,
} from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSongById, updateSong, getAllGenres } from "../../../../services/SongsService";
import { notifications } from "@mantine/notifications";

const UpdateSongForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      song_name: "",
      singer_name: "",
      genre_id: "",
      audio_file: null,
      image_file: null,
      video_file: null,
  });
  const [genres, setGenres] = useState([]);
  const [currentUrls, setCurrentUrls] = useState({
      url_audio: "",
      image: "",
      url_video: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

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

  // Lấy thông tin bài hát
  useEffect(() => {
      const fetchSong = async () => {
          setIsLoading(true);
          try {
              const response = await getSongById(id);
              setFormData({
                  song_name: response.data.song_name,
                  singer_name: response.data.singer_name,
                  genre_id: response.data.genre,
                  audio_file: null,
                  image_file: null,
                  video_file: null,
              });
              setCurrentUrls({
                  url_audio: response.data.url_audio || "",
                  image: response.data.image || "",
                  url_video: response.data.url_video || "",
              });
          } catch (error) {
              console.error("Error fetching song:", error);
              notifications.show({
                  title: "Error",
                  message: "Failed to load song data",
                  color: "red",
              });
          } finally {
              setIsLoading(false);
          }
      };
      fetchSong();
  }, [id]);

  // Xử lý submit form
  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          await updateSong(id, formData, currentUrls);
          notifications.show({
              title: "Success",
              message: "Song updated successfully",
              color: "green",
          });
          navigate("/admin/songs");
      } catch (error) {
          console.error("Error updating song:", error);
          notifications.show({
              title: "Error",
              message: error.response?.status === 403
                  ? "You do not have permission to update this song"
                  : "Failed to update song",
              color: "red",
          });
      } finally {
          setIsLoading(false);
      }
  };

  // Xử lý thay đổi input
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
              Update Song
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
                          <div>
                              <Text size="sm" mb={5}>Audio File</Text>
                              {currentUrls.url_audio && (
                                  <Text size="sm" mb={5} color="blue" component="a" href={currentUrls.url_audio} target="_blank">
                                      Current Audio: {currentUrls.url_audio}
                                  </Text>
                              )}
                              <FileInput
                                  label="Upload new audio file"
                                  size="md"
                                  accept="audio/mp3,audio/mp4,audio/wav"
                                  onChange={(file) => handleInputChange("audio_file", file)}
                                  placeholder="Upload new audio file"
                              />
                          </div>
                          <div>
                              <Text size="sm" mb={5}>Image File</Text>
                              {currentUrls.image && (
                                  <Text size="sm" mb={5} color="blue" component="a" href={currentUrls.image} target="_blank">
                                      Current Image: {currentUrls.image}
                                  </Text>
                              )}
                              <FileInput
                                  label="Upload new image file"
                                  size="md"
                                  accept="image/jpeg,image/jpg,image/png"
                                  onChange={(file) => handleInputChange("image_file", file)}
                                  placeholder="Upload new image file"
                              />
                          </div>
                          <div>
                              <Text size="sm" mb={5}>Video File</Text>
                              {currentUrls.url_video && (
                                  <Text size="sm" mb={5} color="blue" component="a" href={currentUrls.url_video} target="_blank">
                                      Current Video: {currentUrls.url_video}
                                  </Text>
                              )}
                              <FileInput
                                  label="Upload new video file"
                                  size="md"
                                  accept="video/mp4,video/mov,video/avi"
                                  onChange={(file) => handleInputChange("video_file", file)}
                                  placeholder="Upload new video file"
                              />
                          </div>
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

export default UpdateSongForm;