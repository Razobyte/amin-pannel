import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function Portfolio() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description of project 1', image: '', link: '' },
    { id: 2, title: 'Project 2', description: 'Description of project 2', image: '', link: '' },
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State to control dialog visibility

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { id: projects.length + 1, ...newProject }]);
      setNewProject({ title: '', description: '', image: '', link: '' });
      setIsDialogOpen(false);  // Close the dialog after adding the project
    }
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find(project => project.id === projectId);
    setNewProject({ ...projectToEdit });
    setIsEditing(true);
    setEditingProjectId(projectId);
    setIsDialogOpen(true);  // Open the dialog when editing
  };

  const handleSaveProject = () => {
    setProjects(projects.map(project =>
      project.id === editingProjectId ? { ...project, ...newProject } : project
    ));
    setIsEditing(false);
    setEditingProjectId(null);
    setNewProject({ title: '', description: '', image: '', link: '' });
    setIsDialogOpen(false);  // Close the dialog after saving
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Management
      </Typography>

      {/* Add Project Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}  // Open dialog on click
        style={{ marginBottom: '20px' }}
      >
        + Add Project
      </Button>

      {/* Dialog for Add/Edit Project */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Project Title"
            variant="outlined"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            sx={{ marginBottom: 2 }}
            fullWidth
          />
          <TextField
            label="Project Description"
            variant="outlined"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            sx={{ marginBottom: 2 }}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Project Link"
            variant="outlined"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
            sx={{ marginBottom: 2 }}
            fullWidth
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleSaveProject : handleAddProject} color="primary">
            {isEditing ? 'Save Changes' : 'Add Project'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Portfolio Projects Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell> {/* Serial Number Column */}
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project.id}>
                <TableCell>{index + 1}</TableCell> {/* Display serial number */}
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  {project.image ? (
                    <Box
                      component="img"
                      sx={{ width: '100px', height: '60px', objectFit: 'cover' }}
                      alt="Project Image"
                      src={project.image}
                    />
                  ) : (
                    <span>No image uploaded</span>
                  )}
                </TableCell>
                <TableCell>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditProject(project.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteProject(project.id)}
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

export default Portfolio;
