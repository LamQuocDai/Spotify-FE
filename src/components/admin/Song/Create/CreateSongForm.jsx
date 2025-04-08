import {
    Button,
    Flex,
    Group,
    LoadingOverlay,
    TextInput,
    Title,
    Select,
  } from "@mantine/core";
  import { Link } from "react-router-dom";
  import ImageDropzone from "../../Dropzone/Dropzone";
  
  const CreateSongForm = () => {
    const isLoading = false;
  
    const genres = [
      { value: "1", label: "Pop" },
      { value: "2", label: "Rock" },
      { value: "3", label: "Hip-Hop" },
      { value: "4", label: "Jazz" },
      { value: "5", label: "Classical" },
    ];
  
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
          <form>
            <Group justify="space-between" grow>
              <Flex direction="column" gap={20}>
                <TextInput
                  label="Song Name"
                  size="md"
                  placeholder="Enter song title"
                />
  
                <TextInput
                  label="Singer Name"
                  size="md"
                  placeholder="Enter singer name"
                />
  
                <Select
                  label="Genre"
                  size="md"
                  placeholder="Select genre"
                  data={genres}
                  allowDeselect={false}
                />
              </Flex>
  
              <ImageDropzone onUpload={() => {}} />
            </Group>
  
            <Group grow mt={20}>
              <TextInput
                label="Song URL"
                size="md"
                placeholder="Enter song URL"
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
  
  export default CreateSongForm;
  