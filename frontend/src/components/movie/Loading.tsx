import { Box, Skeleton, Stack } from "@mui/material";

export const MovieDetailTextLoading = () => (
  <Stack>
    <Box>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={"100%"}
        height={60}
      />
    </Box>
    <Box mt={2}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={"100%"}
        height={20}
      />
    </Box>
    <Box mt={4}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={"100%"}
        height={40}
      />
    </Box>
    {new Array(4).fill("").map((_x, index) => (
      <Box mt={index === 0 ? 6 : 1} key={index}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={15}
        />
      </Box>
    ))}
    <Box mt={4}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={200}
        height={40}
      />
    </Box>
  </Stack>
);

export const MovieDetailImageLoading = () => (
  <Skeleton
    variant="rectangular"
    animation="wave"
    sx={{ paddingTop: "140%" }}
  />
);
