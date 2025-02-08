import React, { useState, useRef } from "react";
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
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import Add icon
import JoditEditor from "jodit-react";
import parse from "html-react-parser"; // Import html-react-parser for HTML parsing

function Blogs() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "First Blog Post",
      content: "<p>This is the <strong>content</strong> of the first blog post.</p>",
      tags: "React, JavaScript",
      image: "",
      sortOrder: 1,
    },
    {
      id: 2,
      title: "Second Blog Post",
      content: "<p>This is the content of the <em>second blog post</em>.</p>",
      tags: "Material UI, React",
      image: "",
      sortOrder: 2,
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
    sortOrder: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // Track dialog open state
  const editor = useRef(null);

  const handleAddBlog = () => {
    if (newBlog.title && newBlog.content && newBlog.sortOrder) {
      setBlogs([
        ...blogs,
        {
          id: blogs.length + 1,
          title: newBlog.title,
          content: newBlog.content,
          tags: newBlog.tags,
          image: newBlog.image,
          sortOrder: newBlog.sortOrder,
        },
      ]);
      resetForm();
      setDialogOpen(false); // Close dialog after adding
    }
  };

  const handleEditBlog = (blogId) => {
    const blogToEdit = blogs.find((blog) => blog.id === blogId);
    setNewBlog({ ...blogToEdit });
    setIsEditing(true);
    setEditingBlogId(blogId);
    setDialogOpen(true); // Open dialog for editing
  };

  const handleSaveBlog = () => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === editingBlogId
          ? {
              ...blog,
              title: newBlog.title,
              content: newBlog.content,
              tags: newBlog.tags,
              image: newBlog.image,
              sortOrder: newBlog.sortOrder,
            }
          : blog
      )
    );
    resetForm();
    setDialogOpen(false); // Close dialog after saving
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setNewBlog({ title: "", content: "", tags: "", image: "", sortOrder: "" });
    setIsEditing(false);
    setEditingBlogId(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Blog Management
      </Typography>

      {/* Add/Edit Blog Button */}
      <Button
        variant="contained"
        onClick={() => setDialogOpen(true)} // Open dialog to add blog
        startIcon={<AddIcon />}
      >
        Add Blog
      </Button>

      {/* Dialog for Add/Edit Blog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{isEditing ? "Edit Blog" : "Add New Blog"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Blog Title"
            variant="outlined"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {/* JoditEditor for content */}
          <JoditEditor
            ref={editor}
            value={newBlog.content}
            onChange={(newContent) =>
              setNewBlog((prev) => ({ ...prev, content: newContent }))
            }
            config={{
              readonly: false,
              placeholder: "Start typing your blog content here...",
            }}
          />
          <TextField
            label="Tags"
            variant="outlined"
            value={newBlog.tags}
            onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          {/* Sort Order Input */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <Select
              value={newBlog.sortOrder}
              onChange={(e) =>
                setNewBlog({ ...newBlog, sortOrder: e.target.value })
              }
              displayEmpty
            >
              <MenuItem value="" disabled>
                Sort Order
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={isEditing ? handleSaveBlog : handleAddBlog}
          >
            {isEditing ? "Save Changes" : "Add Blog"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Blogs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Sort Order</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{parse(blog.content)}</TableCell> {/* Parsing HTML content */}
                <TableCell>{blog.tags}</TableCell>
                <TableCell>
                  {blog.image ? (
                    <Box
                      component="img"
                      sx={{
                        width: "100px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      alt="Blog Image"
                      src={blog.image}
                    />
                  ) : (
                    <span>No image uploaded</span>
                  )}
                </TableCell>
                <TableCell>{blog.sortOrder}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditBlog(blog.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Blogs;
