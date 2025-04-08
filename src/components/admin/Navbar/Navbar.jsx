import {
    Group,
    Text,
    ScrollArea,
    ThemeIcon,
    Image,
  } from "@mantine/core";
  import {
    IconUser,
    IconMusic,
    IconPlaylist,
    IconBrandNeteaseMusic,
  } from "@tabler/icons-react";
  import { Link } from "react-router-dom";
  import NavbarFooter from "./NavbarFooter";
  import LinksGroup from "./NavbarLinksGroup";
  import classes from "./Navbar.module.scss";
  import logoImage from "../../../assets/logo.png";
  import clsx from "clsx";
  
  const mockdata = [
    { label: "User", icon: IconUser, link: "/admin/users" },
    { label: "Song", icon: IconMusic, link: "/admin/songs" },
    { label: "Genre", icon: IconBrandNeteaseMusic, link: "/admin/genres" },
    { label: "Playlist", icon: IconPlaylist, link: "/admin/playlists" },
  ];
  
  const Navbar = ({ isCollapsed }) => {
    const links = mockdata.map((item) => (
      <LinksGroup {...item} isCollapsed={isCollapsed} key={item.label} />
    ));
  
    return (
      <nav
        className={clsx(
          classes.navbar,
          "transition-all duration-300",
          isCollapsed ? "w-[65px]" : "w-[300px]"
        )}
      >
        <div className={classes.header}>
          <Link to="/admin">
            <Group wrap="no">
              <ThemeIcon variant="white" radius="xl" color="#1db954">
                <Image w="auto" fit="contain" src={logoImage} />
              </ThemeIcon>
              {!isCollapsed && (
                <Text
                  size="xl"
                  fw={900}
                  color="#1db954"
                  className={clsx(
                    classes.logoText,
                    isCollapsed ? classes.collapsed : classes.expanded
                  )}
                >
                  Spotify
                </Text>
              )}
            </Group>
          </Link>
        </div>
  
        <ScrollArea className={classes.links}>
          <div className={`${classes.linksInner} overflow-x-hidden`}>
            {links}
          </div>
        </ScrollArea>
  
        <div className={classes.footer}>
          <NavbarFooter isCollapsed={isCollapsed} />
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  