import { Grid, Skeleton } from "@mui/material";

export const GridDataLoading = () => {
  return new Array(6).fill("").map((_x, i) => (
    <Grid item key={i}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={225}
        height={335}
      />
    </Grid>
  ));
};
