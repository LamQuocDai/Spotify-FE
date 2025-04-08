import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import classes from "./NavbarFooter.module.scss";

const NavbarFooter = ({ isCollapsed }) => {
  const user = {
    name: "John Doe",
    username: "johndoe",
    image: "https://via.placeholder.com/40", 
  };

  return (
    <UnstyledButton className={classes.user}>
      <Group wrap="no">
        <Avatar src={user.image} radius="xl" />

        {!isCollapsed && (
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user.name}
            </Text>
            <Text c="dimmed" size="xs">
              {user.username}
            </Text>
          </div>
        )}
      </Group>
    </UnstyledButton>
  );
};

export default NavbarFooter;
