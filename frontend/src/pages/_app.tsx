import { theme } from "@/styleConfig/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RootContainer from "@/layout/RootContainer";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CustomisedSnackbar } from "@/components/common/CustomisedSnackbar";
import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
  dehydratedState: DehydratedState;
}>) {
  const [interval, setInterval] = useState<number>(0);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CssBaseline />
            <NextNProgress
              color={theme.palette.primary.main}
              showOnShallow={false}
            />
            <CustomisedSnackbar>
              <RootContainer setInterval={setInterval}>
                <Component {...pageProps} />
              </RootContainer>
            </CustomisedSnackbar>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
