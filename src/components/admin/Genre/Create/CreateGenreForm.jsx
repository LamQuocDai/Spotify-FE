import {
    Button,
    Group,
    LoadingOverlay,
    TextInput,
    Title,
  } from "@mantine/core";
  import { Link } from "react-router-dom";
  
  const CreateGenreForm = () => {
    const isLoading = false;
  
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
          <form>
            <TextInput
              label="Genre Name"
              size="md"
              placeholder="Enter genre name"
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
  