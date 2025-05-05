import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import classes from "./NavbarFooter.module.scss";

const NavbarFooter = ({ isCollapsed }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    first_name: "Unknown",
    image: "",
  };

  return (
    <UnstyledButton className={classes.user}>
      <Group wrap="no">
        <Avatar src={storedUser.avatar} radius="xl" />

        {!isCollapsed && (
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {storedUser.first_name}
            </Text>
          </div>
        )}
      </Group>
    </UnstyledButton>
  );
};

export default NavbarFooter;