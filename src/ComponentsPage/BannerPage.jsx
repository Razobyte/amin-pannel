import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BannerPage = () => {
  const [files, setFiles] = useState([]);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    status: "Inactive",
    sortOrder: "", // Added sortOrder field
  });
  const [uploadStatus, setUploadStatus] = useState(""); // Track upload status

<<<<<<< HEAD
  // Fetch uploaded images from the server on component mount
  useEffect(() => {
    fetchUploadedImages();
  }, []);

  // Fetch uploaded images
  const fetchUploadedImages = async () => {
    try {
      const response = await axios.get("http://13.202.251.211/api/find");
      // Ensure the response is an array of image objects
      if (Array.isArray(response.data.files)) {
        const fullImagePaths = response.data.files.map((file) => ({
          path: `http://13.202.251.211${file}`, // Prepend the base URL
          filename: file.split('/').pop(), // Extract file name from path
        }));
        setUploadedImages(fullImagePaths);
      } else {
        console.error("Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching uploaded images:", error);
    }
  };

  // Handle file selection
=======
>>>>>>> 72de806 (Updated BannerPage component)
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleTitleChange1 = (e) => {
    setTitle1(e.target.value);
  };

  const handleTitleChange2 = (e) => {
    setTitle2(e.target.value);
  };

  // API call to upload image
  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      data.append("image", file);
      const response = await axios.post("http://13.202.251.211/api/image", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload complete!");
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Upload failed");
      return null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if ((!title1 && !title2) || files.length === 0) {
      setError("Please provide titles and select at least one image.");
      return;
    }
    setError("");
    const uploaded = [];
    for (const file of files) {
      const responseData = await uploadImage(file);
      if (responseData) {
        uploaded.push({
          id: uploadedImages.length + uploaded.length + 1,
          title1,
          title2,
          filename: file.name,
          path: URL.createObjectURL(file),
          status: "Inactive",
          sortOrder: "",
        });
      }
    }
    setUploadedImages([...uploadedImages, ...uploaded]);
    setTitle1("");
    setTitle2("");
    setFiles([]);
    setUploadStatus("");
  };

  const handleDelete = (id) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  const handleEdit = (id) => {
    const imageToEdit = uploadedImages.find((image) => image.id === id);
    setFormData({
      title: imageToEdit.title1,
      description: imageToEdit.title2,
      image: imageToEdit.filename,
      status: imageToEdit.status,
      sortOrder: imageToEdit.sortOrder,
    });
    setFormDialogOpen(true);
  };

  const handleDialogOpen = () => setFormDialogOpen(true);
  const handleDialogClose = () => {
    setFormDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      image: null,
      status: "Inactive",
      sortOrder: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleFormSubmit = () => {
    if (formData.title && formData.image) {
      const newImage = {
        id: uploadedImages.length + 1,
        title1: formData.title,
        title2: "",
        filename: formData.image.name,
        path: URL.createObjectURL(formData.image),
        status: formData.status,
        sortOrder: formData.sortOrder,
      };
      setUploadedImages([...uploadedImages, newImage]);
      handleDialogClose();
    }
  };

  const toggleStatus = (id) => {
    setUploadedImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id
          ? { ...image, status: image.status === "Active" ? "Inactive" : "Active" }
          : image
      )
    );
  };

  return (
    <>
      <Box sx={{ padding: 3, fontFamily: "Arial, sans-serif" }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: "1.5rem" }}>
          Image Upload
        </Typography>

        <form onSubmit={handleUpload}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              startIcon={<AddIcon />}
              sx={{
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Add Banner
            </Button>
          </Box>
        </form>

        {error && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2, fontSize: "0.875rem" }}>
            {error}
          </Typography>
        )}

        <Dialog open={formDialogOpen} onClose={handleDialogClose}>
          <DialogTitle sx={{ fontSize: "1.25rem" }}>Add New Entry</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2, fontSize: "0.875rem" }}
              value={formData.title}
              onChange={handleFormChange}
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2, fontSize: "0.875rem" }}
              value={formData.description}
              onChange={handleFormChange}
            />
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1" gutterBottom sx={{ fontSize: "0.875rem" }}>
                Upload Image:
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{ padding: "8px 16px", cursor: "pointer", fontSize: "0.875rem" }}
              >
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFormImageChange}
                  hidden
                />
              </Button>
            </Box>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Sort Order</InputLabel>
              <Select
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleFormChange}
                label="Sort Order"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} sx={{ fontSize: "0.875rem" }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleFormSubmit} sx={{ fontSize: "0.875rem" }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h5" sx={{ marginTop: 4, fontSize: "1.25rem" }}>
          Uploaded Banners
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: 2, padding: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontSize: "0.75rem", padding: "4px" }}>
                  Banner
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.75rem", padding: "4px" }}>
                  File Name
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.75rem", padding: "4px" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.75rem", padding: "4px" }}>
                  Sort Order
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.75rem", padding: "4px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedImages.map((image,index) => (
                    <TableRow key={index}>
                    <TableCell align="center" sx={{ padding: "4px" }}>
                      <img
                        src={image.path}// Use the full image URL
                        alt={image.filename}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "0.75rem", padding: "4px" }}>
                      {image.filename}
                    </TableCell>
                    {/* Add other columns as needed */}
                  </TableRow>
                ))}
              
            
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default BannerPage;
