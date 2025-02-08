import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import Add icon
import SearchIcon from '@mui/icons-material/Search'; // Import Search icon
import ResetIcon from '@mui/icons-material/Refresh'; // Import Reset icon

function Testimonials() {
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'John Doe', image: '', status: 'Active', sortOrder: 1, description: 'Great service!' },
    { id: 2, name: 'Jane Smith', image: '', status: 'Inactive', sortOrder: 2, description: 'Very satisfied with the product.' },
  ]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', image: '', status: 'Active', sortOrder: 1, description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State to control dialog visibility
  const [filterText, setFilterText] = useState('');  // State for filtering

  const handleAddTestimonial = () => {
    if (newTestimonial.name) {
      setTestimonials([...testimonials, { id: testimonials.length + 1, ...newTestimonial }]);
      setNewTestimonial({ name: '', image: '', status: 'Active', sortOrder: 1, description: '' });
      setIsDialogOpen(false);  // Close the dialog after adding the testimonial
    }
  };

  const handleEditTestimonial = (testimonialId) => {
    const testimonialToEdit = testimonials.find(testimonial => testimonial.id === testimonialId);
    setNewTestimonial({ ...testimonialToEdit });
    setIsEditing(true);
    setEditingTestimonialId(testimonialId);
    setIsDialogOpen(true);  // Open the dialog when editing
  };

  const handleSaveTestimonial = () => {
    setTestimonials(testimonials.map(testimonial =>
      testimonial.id === editingTestimonialId ? { ...testimonial, ...newTestimonial } : testimonial
    ));
    setIsEditing(false);
    setEditingTestimonialId(null);
    setNewTestimonial({ name: '', image: '', status: 'Active', sortOrder: 1, description: '' });
    setIsDialogOpen(false);  // Close the dialog after saving
  };

  const handleDeleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTestimonial({ ...newTestimonial, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleStatus = (id) => {
    setTestimonials(testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonial, status: testimonial.status === 'Active' ? 'Inactive' : 'Active' } : testimonial
    ));
  };

  // Filter testimonials based on the filterText
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSearch = () => {
    // You can add more complex search logic here if needed
  };

  const handleResetFilter = () => {
    setFilterText('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Testimonials Management
      </Typography>

      {/* Add Testimonial Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}  // Open dialog on click
        startIcon={<AddIcon />}  // Add plus icon
        style={{ marginBottom: '20px' }}
      >
        Add Testimonial
      </Button>

      {/* Search and Reset Filter */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton color="secondary" onClick={handleResetFilter}>
          <ResetIcon />
        </IconButton>
      </div>

      {/* Dialog for Add/Edit Testimonial */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            fullWidth
            style={{ marginBottom: '15px' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: '15px' }}
          />
          {/* Status Select */}
          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <Select
              value={newTestimonial.status}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          {/* Sort Order Select */}
          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <Select
              value={newTestimonial.sortOrder}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, sortOrder: e.target.value })}
            >
              {[1, 2, 3, 4].map(order => (
                <MenuItem key={order} value={order}>{order}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* New Description Input */}
          <TextField
            label="Description"
            variant="outlined"
            value={newTestimonial.description}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, description: e.target.value })}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '15px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleSaveTestimonial : handleAddTestimonial} color="primary">
            {isEditing ? 'Save Changes' : 'Add Testimonial'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Testimonials Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '0.75rem', padding: '8px', fontWeight:"bold" }}>Sr.</TableCell>
              <TableCell sx={{ fontSize: '0.75rem', padding: '8px', fontWeight:"bold" }}>Image</TableCell>
              <TableCell sx={{ fontSize: '0.75rem', padding: '8px', fontWeight:"bold" }}>Name</TableCell>
              <TableCell sx={{ fontSize: '0.75rem', padding: '8px', fontWeight:"bold" }}>Status</TableCell>
              <TableCell sx={{ fontSize: '0.75rem', padding: '8px', fontWeight:"bold" }}>Description</TableCell> {/* Added Description column */}
              <TableCell sx={{ fontSize: '0.75rem', padding: '8px', fontWeight:"bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTestimonials.map((testimonial, index) => (
              <TableRow key={testimonial.id}>
                <TableCell sx={{ fontSize: '0.75rem', padding: '8px' }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem', padding: '8px' }}>
                  {testimonial.image ? (
                    <Box
                      component="img"
                      sx={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
                      alt="Testimonial Image"
                      src={testimonial.image}
                    />
                  ) : (
                    <span>No image uploaded</span>
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: '0.75rem', padding: '8px' }}>{testimonial.name}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem', padding: '8px' }}>
                  <Button
                    variant="contained"
                    color={testimonial.status === 'Active' ? 'success' : 'error'}
                    onClick={() => toggleStatus(testimonial.id)}
                  >
                    {testimonial.status === 'Active' ? 'Active' : 'Inactive'}
                  </Button>
                </TableCell>
                <TableCell sx={{ fontSize: '0.75rem', padding: '8px' }}>{testimonial.description}</TableCell> {/* Added Description cell */}
                <TableCell sx={{ fontSize: '0.75rem', padding: '8px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditTestimonial(testimonial.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
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

export default Testimonials;
