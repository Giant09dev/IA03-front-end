// src/app/home/page.js
import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Home Page!
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        This is the home page content. You can manage your account here.
      </Typography>

      <Box sx={{ marginTop: 2 }}>
        <Link href="/user/login" passHref>
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Login
          </Button>
        </Link>
        <Link href="/user/register" passHref>
          <Button variant="outlined" color="secondary">
            Register
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
