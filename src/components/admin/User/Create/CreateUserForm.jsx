import {
    Button,
    Flex,
    Group,
    LoadingOverlay,
    PasswordInput,
    Select,
    TextInput,
    Title,
  } from "@mantine/core";
  import { Link } from "react-router-dom";
  import ImageDropzone from "../../Dropzone/Dropzone";
  
  const CreateUserForm = () => {
    const isLoading = false;
    const genre = [
      { value: "1", label: "Male" },
      { value: "2", label: "Female" },
    ];
  
    return (
      <>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
  
        <Title order={1} mt={32}>
          Create User
        </Title>
  
        <div className="bg-white p-8 rounded-lg mt-7">
          <form>
            <Group justify="space-between" grow>
              <Flex direction="column" gap={20}>
                <TextInput
                  label="Name"
                  size="md"
                  placeholder="Enter your name"
                />
  
                <TextInput
                  label="Phone"
                  size="md"
                  type="number"
                  placeholder="Enter your phone number"
                />
              </Flex>
  
              <ImageDropzone onUpload={() => {}} />
            </Group>
  
            <Group grow mt={20}>
              <TextInput
                label="Email"
                size="md"
                type="email"
                placeholder="Enter your email"
              />
  
              <PasswordInput
                label="Password"
                size="md"
                placeholder="Enter your password"
              />
            </Group>
  
            <Group grow mt={20}>
              <Select
                label="Genre"
                size="md"
                placeholder="Select genre"
                data={genre}
                allowDeselect={false}
              />
  
              <PasswordInput
                label="Confirm password"
                size="md"
                placeholder="Repeat your password"
              />
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
  
  export default CreateUserForm;
  