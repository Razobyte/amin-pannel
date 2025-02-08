import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Select, MenuItem, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Switch, FormControlLabel } from '@mui/material';

function Services() {
  const [services, setServices] = useState([
    { id: 1, title: 'Web Development', description: 'Building modern and responsive websites', image: '', status: 'Active' },
    { id: 2, title: 'Mobile App Development', description: 'Creating mobile applications for iOS and Android', image: '', status: 'Inactive' },
  ]);
  const [newService, setNewService] = useState({ title: '', description: '', image: '', status: 'Active' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State to control dialog visibility

  const handleAddService = () => {
    if (newService.title && newService.description) {
      setServices([...services, { id: services.length + 1, ...newService }]);
      setNewService({ title: '', description: '', image: '', status: 'Active' });
      setIsDialogOpen(false);  // Close the dialog after adding the service
    }
  };

  const handleEditService = (serviceId) => {
    const serviceToEdit = services.find(service => service.id === serviceId);
    setNewService({ ...serviceToEdit });
    setIsEditing(true);
    setEditingServiceId(serviceId);
    setIsDialogOpen(true);  // Open the dialog when editing
  };

  const handleSaveService = () => {
    setServices(services.map(service =>
      service.id === editingServiceId ? { ...service, ...newService } : service
    ));
    setIsEditing(false);
    setEditingServiceId(null);
    setNewService({ title: '', description: '', image: '', status: 'Active' });
    setIsDialogOpen(false);  // Close the dialog after saving
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService({ ...newService, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = (serviceId) => {
    setServices(services.map(service =>
      service.id === serviceId ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' } : service
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Services Management
      </Typography>

      {/* Add Service Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDialogOpen(true)}  // Open dialog on click
        style={{ marginBottom: '20px' }}
      >
        Add Service
      </Button>

      {/* Dialog for Add/Edit Service */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Service' : 'Add Service'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Service Title"
            variant="outlined"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
            fullWidth
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Service Description"
            variant="outlined"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '15px' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <Select
              value={newService.status}
              onChange={(e) => setNewService({ ...newService, status: e.target.value })}
              displayEmpty
              placeholder="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleSaveService : handleAddService} color="primary">
            {isEditing ? 'Save Changes' : 'Add Service'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Services Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={service.id}>
                <TableCell>{index + 1}</TableCell> {/* Serial Number */}
                <TableCell>{service.title}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  {service.image ? (
                    <Box
                      component="img"
                      sx={{ width: '100px', height: '60px', objectFit: 'cover' }}
                      alt="Service Image"
                      src={service.image}
                    />
                  ) : (
                    <span>No image uploaded</span>
                  )}
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={service.status === 'Active'}
                        onChange={() => handleStatusChange(service.id)}
                        name="status"
                        color="primary"
                      />
                    }
                    label={service.status}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditService(service.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteService(service.id)}
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

export default Services;
