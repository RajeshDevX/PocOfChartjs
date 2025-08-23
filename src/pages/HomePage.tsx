// src/pages/HomePage.tsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

// Simulate API with delay
const getPosts = async (page: number, limit: number) => {
  const { data } = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );

  // Artificial delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const data = await getPosts(page, isMobile ? 3 : 3);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);

        // Scroll into view after adding new posts
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, isMobile]);

  useEffect(() => {
    fetchPosts();
  }, [page, fetchPosts]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // mobile
          sm: "repeat(2, 1fr)", // tablet
          md: "repeat(3, 1fr)", // small desktop
        },
        gap: 3,
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Render posts */}
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" aria-label="read more">
              Read More
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Skeleton loader */}
      {loading &&
        Array.from(new Array(isMobile ? 2 : 4)).map((_, i) => (
          <Card
            key={`skeleton-${i}`}
            sx={{
              borderRadius: 3,
              boxShadow: 1,
              p: 2,
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={140} />
            <Skeleton width="60%" sx={{ mt: 2 }} />
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </Card>
        ))}

      {/* See More button */}
      {!loading && hasMore && (
        <Box
          ref={bottomRef}
          sx={{ gridColumn: "1/-1", textAlign: "center", py: 3 }}
        >
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
          >
            See More
          </Button>
        </Box>
      )}

      {/* End message */}
      {!hasMore && !loading && (
        <Box
          ref={bottomRef}
          sx={{ gridColumn: "1/-1", textAlign: "center", py: 3 }}
        >
          <Typography variant="body2" color="text.secondary">
            🎉 You’ve reached the end of the story
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
