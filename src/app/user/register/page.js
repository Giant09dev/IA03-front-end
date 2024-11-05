"use client";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      createdAt: new Date().toISOString().split("T")[0], // Defaults to today's date
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://ia-03-front-end.vercel.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Registration successful!"); // Success notification
      } else {
        const errorResult = await response.json();
        toast.error(errorResult.message || "Registration failed."); // Error notification
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error}`); // Network error notification
    }
  };

  const password = watch("password");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Register
      </Typography>

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid email format",
          },
        })}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={
          errors.confirmPassword ? errors.confirmPassword.message : ""
        }
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />

      <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit
      </Button>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseDrag
      />
    </Box>
  );
}
