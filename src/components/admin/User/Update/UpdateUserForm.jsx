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

const UpdateUserForm = () => {
  const isLoading = false;

  const genre = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
  ];

  const user = {
    name: "John Doe",
    phone: "0123456789",
    image: "some-image-url.jpg",
    genre: "Female",
  };

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32}>
        Update User
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <form>
          <Group justify="space-between" grow>
            <Flex direction="column" gap={20}>
              <TextInput
                label="Name"
                size="md"
                placeholder="Enter your name"
                defaultValue={user.name}
              />

              <TextInput
                label="Phone"
                size="md"
                type="number"
                placeholder="Enter your phone number"
                defaultValue={user.phone}
              />

              <Select
                label="Genre"
                size="md"
                placeholder="Select genre"
                data={genre}
                allowDeselect={false}
              />
            </Flex>

            <ImageDropzone object={user} onUpload={() => {}} />
          </Group>

          <Group mt={32} justify="flex-end">
            <Link to="/admin/users">
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

export default UpdateUserForm;
