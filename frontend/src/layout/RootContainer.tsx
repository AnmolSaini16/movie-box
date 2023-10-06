import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Box } from "@mui/material";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/navbar/Navbar";
import { AppContext } from "@/context/appContext";
import { getTokenExpiryTime, isTokenExpired } from "@/utils";
import { useSession, signOut } from "next-auth/react";

const RootContainer = ({
  children,
  setInterval,
}: {
  children: JSX.Element;
  setInterval: Dispatch<SetStateAction<number>>;
}) => {
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");

  useEffect(() => {
    if (session?.user?.token) {
      const token = session.user.token;

      if (isTokenExpired(token)) {
        signOut({ redirect: false });
      }

      const sessionRefetchInterval = Math.round(
        (getTokenExpiryTime(token) * 1000 - Date.now()) / 1000
      );

      setInterval(sessionRefetchInterval > 0 ? sessionRefetchInterval : 0);
    }
  }, [session]);

  return (
    <AppContext.Provider
      value={{ showAuthModal, setShowAuthModal, searchText, setSearchText }}
    >
      <Navbar />
      <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
        {children}
      </Box>
      <Footer />
    </AppContext.Provider>
  );
};

export default RootContainer;
