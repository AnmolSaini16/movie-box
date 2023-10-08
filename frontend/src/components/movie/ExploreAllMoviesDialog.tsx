import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { GridDataLoading } from "../common/GridDataLoading";
import { getInfiniteMoviesWithType } from "@/api/movieApi";
import {
  MovieItemType,
  MovieRowTitle,
  MovieType,
} from "@/constants/movieContants";
import MovieItem from "./MovieItem";

interface Props {
  open: boolean;
  handleClose: () => void;
  movieType: MovieType;
  rowTitle: MovieRowTitle;
}
export const ExploreAllMoviesDialog: React.FC<Props> = ({
  open,
  handleClose,
  movieType,
  rowTitle,
}) => {
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    getInfiniteMoviesWithType(movieType);

  const movieData = data?.pages;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        maxWidth="lg"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box maxWidth="81%" mx="auto" mt={2}>
            <Box mb={1}>
              <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                {rowTitle}
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {isLoading ? (
                <GridDataLoading />
              ) : (
                movieData?.map((group, i) => (
                  <React.Fragment key={i}>
                    {group?.results?.map((movie) => (
                      <Grid item key={movie.id}>
                        <MovieItem
                          movie={movie}
                          type={MovieItemType.MovieRowItem}
                        />
                      </Grid>
                    ))}
                  </React.Fragment>
                ))
              )}
            </Grid>
            <Box sx={{ width: "100%", textAlign: "center", my: 2 }} ref={ref}>
              {isFetchingNextPage && <CircularProgress />}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
