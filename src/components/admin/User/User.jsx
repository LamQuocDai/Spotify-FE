import { IconPlus, IconTrashX } from "@tabler/icons-react";
import { Button, Group, LoadingOverlay, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";
import UserTable from "./UserTable";
import Search from "../Search/Search";

const User = () => {
  const isLoading = false;
  const selectedUsers = [];

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: <Text size="xl">Delete users</Text>,
      children: (
        <>
          <Text size="md">Are you sure you want to delete checked users?</Text>
          <Text mt="sm" c="yellow" fs="italic" size="sm">
            This action is irreversible and you will have to contact support to restore your data.
          </Text>
        </>
      ),
      labels: { confirm: "Delete users", cancel: "Cancel" },
      confirmProps: { color: "red" },
    });

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={1} mt={32} className="text-[#1db954]">
        Users
      </Title>

      <div className="bg-white p-8 rounded-lg mt-7">
        <Group justify="space-between" mb={24}>
          <Search placeholder="Search users" />

          <Group>
            {selectedUsers.length > 0 && (
              <Button
                variant="light"
                color="red"
                radius="md"
                onClick={openDeleteModal}
              >
                <IconTrashX width={18} height={18} />
              </Button>
            )}
            <Link to="/admin/users/create">
              <Button
                leftSection={<IconPlus />}
                variant="filled"
                color="#1db954"
                radius="md"
              >
                Create user
              </Button>
            </Link>
          </Group>
        </Group>

        <UserTable
          users={[]}
          fetchUsers={() => {}}
          sortBy={null}
          order="asc"
          setIsLoading={() => {}}
          selectedUsers={[]}
          setSelectedUsers={() => {}}
          handleSort={() => {}}
          size={10}
          setSize={() => {}}
        />
      </div>
    </>
  );
};

export default User;
