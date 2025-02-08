import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://13.202.251.211/api/login",
        formData
      );

      if (response.data.userdata) {
        localStorage.setItem("user", JSON.stringify(response.data.userdata));
        navigate("/admin");
      } else {
        setErrorMessage(
          response.data.message || "Login failed. Please try again."
        );
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
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
          Login
        </Typography>
        <form onSubmit={handleLogin}>
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
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Typography
              variant="body2"
              component="span"
              sx={{ cursor: "pointer", color: "#a0c4ff" }}
            >
              Forgot password?
            </Typography>
            <Link
              href="/register"
              underline="none"
              sx={{ color: "#a0c4ff", fontWeight: "bold" }}
            >
              Register
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
            type="submit"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
