import React, { useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [description, setDescription] = useState(""); // New state for description
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpload = () => {
    if (!title || !videoFile || !description) {
      setError("Please provide a title, select a video, and add a description.");
      return;
    }

    const newVideo = {
      id: videos.length + 1,
      title,
      file: videoFile,
      status,
      description, // Include description here
    };

    setVideos([...videos, newVideo]);
    setTitle("");
    setVideoFile(null);
    setStatus("Inactive");
    setDescription(""); // Clear the description field
    setError("");
    setAddDialogOpen(false); // Close the dialog after upload
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const toggleStatus = (id) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, status: video.status === "Active" ? "Inactive" : "Active" } : video
      )
    );
  };

  const handleEdit = (id) => {
    const videoToEdit = videos.find((video) => video.id === id);
    setEditVideo(videoToEdit);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === editVideo.id ? { ...editVideo } : video
      )
    );
    setEditDialogOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: "20px" }}>
        Video Management
      </Typography>

      <Button
        variant="contained"
        onClick={() => setAddDialogOpen(true)}
        sx={{
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "12px",
          marginBottom: 2,
        }}
      >
        + Add New Video
      </Button>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2, fontSize: "12px" }}>
          {error}
        </Typography>
      )}

      <Typography variant="h5" sx={{ marginTop: 4, fontSize: "16px" }}>
        Uploaded Videos
      </Typography>
      {videos.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontSize: "12px" }}>
                  Sr. No.
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "12px" }}>
                  Title
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "12px" }}>
                  Video
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "12px" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "12px" }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "12px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video, index) => (
                <TableRow key={video.id}>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    {video.title}
                  </TableCell>
                  <TableCell align="center">
                    <video width="120" controls>
                      <source
                        src={video.file.size ? URL.createObjectURL(video.file) : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    {video.status}
                    <Box mt={1}>
                      <Button
                        variant="contained"
                        color={video.status === "Active" ? "success" : "error"}
                        onClick={() => toggleStatus(video.id)}
                        sx={{ fontSize: "12px" }}
                      >
                        {video.status === "Active" ? "Deactivate" : "Activate"}
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    {video.description}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(video.id)}
                      sx={{ marginRight: 1, fontSize: "12px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(video.id)}
                      sx={{ fontSize: "12px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ marginTop: 2, fontSize: "12px" }}>
          No videos uploaded yet.
        </Typography>
      )}

      {/* Add Video Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2 }}>
            <TextField
              label="Video Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Video Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
              multiline
              rows={4}
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              style={{ marginBottom: 16, display: "block" }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} sx={{ fontSize: "12px" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpload} sx={{ fontSize: "12px" }}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      {editVideo && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Video</DialogTitle>
          <DialogContent>
            <Box sx={{ padding: 2 }}>
              <TextField
                label="Video Title"
                variant="outlined"
                value={editVideo.title}
                onChange={(e) =>
                  setEditVideo((prev) => ({ ...prev, title: e.target.value }))
                }
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Video Description"
                variant="outlined"
                value={editVideo.description}
                onChange={(e) =>
                  setEditVideo((prev) => ({ ...prev, description: e.target.value }))
                }
                fullWidth
                sx={{ marginBottom: 2 }}
                multiline
                rows={4}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} sx={{ fontSize: "12px" }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleEditSave} sx={{ fontSize: "12px" }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default Videos;
