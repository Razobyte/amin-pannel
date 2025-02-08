import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const dataSave = async (e) => {
    e.preventDefault();
    

    // Basic validation for empty fields
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://13.202.251.211/api/register", formData);
      console.log("Registration response:", response.data.userdata);
      console.log(data)

      if (response.userdata) {
        navigate("/admin");
      } else {
        alert(response.data.userdata || "Registration failed. Please try again.");
      }

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "white",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "85%", sm: "350px" },
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: 3,
          borderRadius: 3,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          marginBottom={2}
          color="white"
          fontWeight="bold"
        >
          Register
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          margin="dense"
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChangeHandler}
          margin="dense"
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={onChangeHandler}
          margin="dense"
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
          }}
        />
        <Box display="flex" justifyContent="space-between" marginTop={2}>
          <Typography
            variant="body2"
            component="span"
            sx={{ cursor: "pointer", color: "#a0c4ff" }}
          >
            Forgot password?
          </Typography>
          <Link
            href="/"
            underline="none"
            sx={{ color: "#a0c4ff", fontWeight: "bold" }}
          >
            Login
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 3,
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#2a5298" },
          }}
          onClick={dataSave}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
