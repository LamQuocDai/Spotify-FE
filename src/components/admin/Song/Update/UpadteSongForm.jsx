import {
    Button,
    Flex,
    Group,
    LoadingOverlay,
    Select,
    TextInput,
    Title,
  } from "@mantine/core";
  import { Link } from "react-router-dom";
  import ImageDropzone from "../../Dropzone/Dropzone";
  
  const UpdateSongForm = () => {
    const isLoading = false;
  
    const genres = [
      { value: "1", label: "Pop" },
      { value: "2", label: "Rock" },
      { value: "3", label: "Hip-Hop" },
      { value: "4", label: "Jazz" },
      { value: "5", label: "Classical" },
    ];
  
    const song = {
      song_name: "Shape of You",
      singer_name: "Ed Sheeran",
      url: "https://example.com/shape-of-you.mp3",
      genre_id: "1",
      image: "https://example.com/cover.jpg",
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
          <form>
            <Group justify="space-between" grow>
              <Flex direction="column" gap={20}>
                <TextInput
                  label="Song Name"
                  size="md"
                  placeholder="Enter song title"
                  defaultValue={song.song_name}
                />
  
                <TextInput
                  label="Singer Name"
                  size="md"
                  placeholder="Enter singer name"
                  defaultValue={song.singer_name}
                />
  
                <Select
                  label="Genre"
                  size="md"
                  placeholder="Select genre"
                  data={genres}
                  allowDeselect={false}
                  defaultValue={song.genre_id}
                />
              </Flex>
  
              <ImageDropzone object={song} onUpload={() => {}} />
            </Group>
  
            <Group grow mt={20}>
              <TextInput
                label="Song URL"
                size="md"
                placeholder="Enter song URL"
                defaultValue={song.url}
              />
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
  