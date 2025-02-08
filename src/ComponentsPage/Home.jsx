import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

export default function Home() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [table, setTable] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://13.202.251.211/api/get");
        setTable(response.data.bookform || []); // Ensure table is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://13.202.251.211/api/delete/${selectedId}`);
      setTable((prevTable) => prevTable.filter((item) => item._id !== selectedId));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOpenDialog = (_id) => {
    setSelectedId(_id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long", // "Monday"
      year: "numeric", // "2025"
      month: "long", // "January"
      // day: "numeric", // "8"
      hour: "2-digit", // "02"
      minute: "2-digit", // "30"
      second: "2-digit", // "45"
      hour12: false, // "AM/PM"
    });
  };

  const paginatedData = table.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  

  return (
    <>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "bold", p: 5 }}
      >
        Customer Details
      </Typography>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table stickyHeader aria-label="responsive table">
              <TableHead>
                <TableRow>
                  {[
                    "SrNo",
                    "DateOfEnquiry",
                    "Customer Name",
                    "Email",
                    "Phone",
                    "Company Name",
                    "Services",
                    "Message",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                        p: "7px",
                        bgcolor: "#E7DDFF",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {formatDate(item.dateOfEnquiry)}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {item.phone}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {item.companyname}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {item.service}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        {item.message}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid black",
                          p: "7px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDialog(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      sx={{
                        textAlign: "center",
                        border: "1px solid black",
                        p: "7px",
                        fontWeight: "bold",
                      }}
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={table.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
