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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: "Client 1", email: "client1@example.com", phone: "123-456-7890", banner: "", content: "", status: "Active" },
    { id: 2, name: "Client 2", email: "client2@example.com", phone: "987-654-3210", banner: "", content: "", status: "Inactive" },
  ]);
  const [newClient, setNewClient] = useState({ name: "", banner: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddClient = () => {
    if (newClient.name && newClient.content) {
      setClients([
        ...clients,
        { id: clients.length + 1, ...newClient, status: "Inactive" }, // Default status is "Inactive"
      ]);
      setNewClient({ name: "", banner: "", content: "" });
      setOpenDialog(false); // Close dialog after adding
    }
  };

  const handleEditClient = (clientId) => {
    const clientToEdit = clients.find(client => client.id === clientId);
    setNewClient({ ...clientToEdit });
    setIsEditing(true);
    setEditingClientId(clientId);
    setOpenDialog(true); // Open dialog for editing
  };

  const handleSaveClient = () => {
    setClients(clients.map(client =>
      client.id === editingClientId ? { ...client, ...newClient } : client
    ));
    setIsEditing(false);
    setEditingClientId(null);
    setNewClient({ name: "", banner: "", content: "" });
    setOpenDialog(false); // Close dialog after saving
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClient({ ...newClient, banner: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleStatus = (clientId) => {
    setClients(clients.map(client =>
      client.id === clientId ? { ...client, status: client.status === "Active" ? "Inactive" : "Active" } : client
    ));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: "2rem" }}>Our Clients</h1>

      {/* Search Bar */}
      <TextField
        label="Search Clients"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2, fontSize: "0.875rem" }}
      />

      {/* Add or Edit Client Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ marginBottom: 2, fontSize: "0.875rem" }}
        startIcon={<AddIcon />}
      >
        Add New Client
      </Button>

      {/* Clients Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight:"bold" }}>SR</TableCell> {/* Serial Number */}
              <TableCell sx={{ fontSize: "0.875rem", fontWeight:"bold" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight:"bold" }}>Client Image</TableCell>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight:"bold" }}>Status</TableCell> {/* Status Column */}
              <TableCell sx={{ fontSize: "0.875rem", fontWeight:"bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client, index) => (
              <TableRow key={client.id}>
                <TableCell sx={{ fontSize: "0.875rem" }}>{index + 1}</TableCell> {/* Display Serial Number */}
                <TableCell sx={{ fontSize: "0.875rem" }}>{client.name}</TableCell>
                <TableCell sx={{ fontSize: "0.875rem" }}>
                  {client.banner ? (
                    <Box
                      component="img"
                      sx={{ width: "100px", height: "60px", objectFit: "cover" }}
                      alt="Client Banner"
                      src={client.banner}
                    />
                  ) : (
                    <span>No banner uploaded</span>
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem" }}>
                  <Button
                    variant="outlined"
                    color={client.status === "Active" ? "success" : "error"} // Color changes based on status
                    onClick={() => toggleStatus(client.id)} // Toggles status when clicked
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {client.status} {/* Displays the current status (Active/Inactive) */}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClient(client.id)}
                    sx={{ marginRight: 1, fontSize: "0.875rem" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClient(client.id)}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Clients */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? "Edit Client" : "Add New Client"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Client Name"
            variant="outlined"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2, fontSize: "0.875rem" }}
          />
          <TextField
            label="Content"
            variant="outlined"
            value={newClient.content}
            onChange={(e) => setNewClient({ ...newClient, content: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2, fontSize: "0.875rem" }}
          />
          {/* Banner Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            style={{ marginBottom: "16px" }}
          />
          {newClient.banner && (
            <Box
              component="img"
              sx={{ width: "100px", height: "60px", objectFit: "cover" }}
              alt="Client Banner"
              src={newClient.banner}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ fontSize: "0.875rem" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={isEditing ? handleSaveClient : handleAddClient}
            sx={{ fontSize: "0.875rem" }}
          >
            {isEditing ? "Save Changes" : "Add Client"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Clients;
