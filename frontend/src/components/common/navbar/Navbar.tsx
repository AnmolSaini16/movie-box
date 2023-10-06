import { AppBar, Box, Button, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useContext } from "react";

import { Logo } from "../Logo";
import { UserMenu } from "./UserMenu";
import { SearchBox } from "./SearchBox";
import { AuthModal } from "../auth/AuthModal";
import { useSession } from "next-auth/react";
import { AppContext, AppContextType } from "@/context/appContext";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollBar({ window, children }: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: "primary.contrastText",
      backgroundColor: trigger ? "background.paper" : "transparent",
    },
  });
}

export const Navbar = () => {
  const { data } = useSession();
  const loggedIn = Boolean(data?.user);
  const { showAuthModal, setShowAuthModal } = useContext(
    AppContext
  ) as AppContextType;

  const getNavMenu = () =>
    loggedIn ? (
      <UserMenu session={data} />
    ) : (
      <Button variant="contained" onClick={() => setShowAuthModal(true)}>
        Sign In
      </Button>
    );

  return (
    <>
      <ScrollBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Logo */}
            <Box display="flex">
              <Logo />
            </Box>

            {/* Search Bar and buttons */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box mr={2}>
                <SearchBox />
              </Box>

              <Box>{getNavMenu()}</Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ScrollBar>

      {showAuthModal && (
        <AuthModal
          open={showAuthModal}
          handleClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};
