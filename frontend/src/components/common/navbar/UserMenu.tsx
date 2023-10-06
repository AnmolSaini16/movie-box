import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Logout from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import Link from "next/link";

export const UserMenu = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    handleClose();
    if (router.asPath === "/favorites") router.push("/");
    else router.reload();
  };

  return (
    <>
      <IconButton
        sx={{ fontSize: "1.8rem" }}
        color="secondary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonOutlinedIcon fontSize="inherit" />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          {session?.user?.name}
        </MenuItem>

        <Link
          href="/favorites"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <FavoriteBorderIcon fontSize="small" />
            </ListItemIcon>
            Favorites
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
