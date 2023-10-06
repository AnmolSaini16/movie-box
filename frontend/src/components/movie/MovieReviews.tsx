import { Review } from "@/interfaces/movieInterface";
import React from "react";
import { WrapperContainer } from "../common/WrapperContainer";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import tmdbConfigs from "@/config/tmbdConfig";

export const MovieReviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <WrapperContainer title={`User Reviews (${reviews.length})`}>
      <List sx={{ overflow: "auto", maxHeight: 500 }}>
        {reviews?.map((review, index) => (
          <Box key={review.id}>
            <ListItem sx={{ alignItems: "flex-start" }}>
              <ListItemAvatar>
                <Avatar
                  alt={review?.author}
                  src={tmdbConfigs.posterPath(
                    review?.author_details?.avatar_path
                  )}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      display: "block",
                      mb: 0.5,
                    }}
                    color="text.secondary"
                    component="span"
                  >
                    A review by {review?.author}{" "}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ fontSize: 12, display: "block", mb: 1 }}
                      color="text.secondary"
                      component="span"
                    >
                      Written on{" "}
                      {dayjs(review?.created_at).format("DD-MM-YYYY HH:mm")}{" "}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.primary"
                    >
                      {review?.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {reviews?.length - 1 !== index && (
              <Divider variant="inset" component="li" />
            )}
          </Box>
        ))}
      </List>
    </WrapperContainer>
  );
};
