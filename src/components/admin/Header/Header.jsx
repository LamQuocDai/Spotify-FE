import { Group, ThemeIcon, UnstyledButton, Tooltip, Menu } from "@mantine/core";
import {
  IconPower,
  IconLayoutSidebarLeftCollapse,
  IconBell,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 cần import
import classes from "./Header.module.scss";

const Header = ({ isCollapsed, setIsCollapsed, setUser }) => {
  const [isNotifiOpen, setIsNotifiOpen] = useState(false);
  const navigate = useNavigate(); // 👈 dùng để điều hướng

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={`h-[60px] px-6 ${classes.header}`}>
      <Group justify="space-between" className="h-full">
        <Tooltip label="Toggle sidebar">
          <UnstyledButton
            className="size-7 flex justify-center items-center"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ThemeIcon variant="white" className="hover:bg-[#228be61f]">
              <IconLayoutSidebarLeftCollapse
                className={classes.chevron}
                style={{
                  transform: isCollapsed ? "rotate(180deg)" : "rotate(0)",
                }}
              />
            </ThemeIcon>
          </UnstyledButton>
        </Tooltip>

        <Group>
          <Menu
            shadow="md"
            onOpen={() => setIsNotifiOpen(true)}
            onClose={() => setIsNotifiOpen(false)}
          >
            <Menu.Target>
              <Tooltip label="Notifications">
                <UnstyledButton className="size-10 flex justify-center items-center">
                  <ThemeIcon
                    color="#1db954"
                    variant="white"
                    size="lg"
                    className="hover:bg-[#228be61f]"
                  >
                    <IconBell />
                  </ThemeIcon>
                </UnstyledButton>
              </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
              {isNotifiOpen && (
                <div className="p-4 text-sm">No notifications</div>
              )}
            </Menu.Dropdown>
          </Menu>

          <Tooltip label="Logout">
            <UnstyledButton
              className="size-10 flex justify-center items-center"
              onClick={handleLogout}
            >
              <ThemeIcon
                color="#1db954"
                variant="white"
                size="lg"
                className="hover:bg-[#228be61f]"
              >
                <IconPower />
              </ThemeIcon>
            </UnstyledButton>
          </Tooltip>
        </Group>
      </Group>
    </header>
  );
};

export default Header;
