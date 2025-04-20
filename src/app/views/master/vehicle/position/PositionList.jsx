import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  Paper,
  Button,
  IconButton,
  Drawer,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Delete, Edit, FilterList } from "@mui/icons-material";
// import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PositionList() {
  const navigate = useNavigate();
  const [positiones, setpositiones] = useState([
    { id: 1, name: "Main position", address: "main@example.com", status: "Active" },
    { id: 2, name: "West position", address: "west@example.com", status: "Inactive" },
    { id: 3, name: "East position", address: "east@example.com", status: "Cancelled" },
    { id: 4, name: "North position", address: "north@example.com", status: "Active" },
    { id: 5, name: "South position", address: "south@example.com", status: "Inactive" },
    { id: 6, name: "South position", address: "south@example.com", status: "Inactive" }
  ]);

  const [filteredpositiones, setFilteredpositiones] = useState(positiones);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedposition, setSelectedposition] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("/api/positiones")
      .then((response) => response.json())
      .then((data) => {
        setpositiones(data);
        setFilteredpositiones(data);
      })
      .catch(() => console.log("Using default data"));
  }, []);

  // pagination
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  // Delete position
  const handleOpenDeleteDialog = (position) => {
    setSelectedposition(position);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteReason("");
  };

  const handleDelete = () => {
    if (!deleteReason.trim()) return; // Prevent deleting without reason

    console.log(`Deleting position: ${selectedposition.name} for reason: ${deleteReason}`);
    const updatedpositiones = positiones.filter((b) => b.id !== selectedposition.id);
    setpositiones(updatedpositiones);
    setFilteredpositiones(updatedpositiones);
    handleCloseDelete();
  };

  // Filter positiones
  const handleFilterChange = () => {
    let filtered = positiones;
    if (filterName.trim()) {
      filtered = filtered.filter((b) => b.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterStatus) {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }
    setFilteredpositiones(filtered);
    handleCloseFilter();
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("");
    setFilteredpositiones(positiones);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredpositiones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "positiones");
    XLSX.writeFile(wb, "positiones.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("position List", 14, 10);

    const tableColumn = ["position", "Email", "Status"];
    const tableRows = filteredpositiones.map((position) => [
      position.name,
      position.address,
      position.status
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });

    doc.save("positiones.pdf");
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <h2>position List</h2>
          <IconButton color="primary" onClick={handleOpenFilter}>
            <FilterList />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("add")}
            md={6}
            xs={12}
            lg={3}
          >
            Add position
          </Button>
          <Button variant="contained" color="success" onClick={exportToExcel}>
            Export to Excel
          </Button>
          <Button variant="contained" color="secondary" onClick={exportToPDF}>
            Export to PDF
          </Button>
        </Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>position</b>
              </TableCell>
              <TableCell align="center">
                <b>Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>Edit</b>
              </TableCell>
              <TableCell align="center">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredpositiones
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((position) => (
                <TableRow key={position.id}>
                  <TableCell align="center">{position.name}</TableCell>
                  <TableCell align="center">{position.address}</TableCell>
                  <TableCell align="center">{position.status}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/master/position/edit/${position.id}`)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(position)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredpositiones.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Box mt={2}>{/* <h2>Reports</h2> */}</Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete <b>{selectedposition?.name}</b>?
          </p>
          <TextField
            fullWidth
            label="Reason for Delete"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={!deleteReason.trim()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Filter Offcanvas (Drawer at the top) */}
      <Drawer anchor="right" open={openFilter} onClose={handleCloseFilter}>
        <Box p={3} width={300} display="flex" flexDirection="column" gap={2}>
          <h3>Filter positiones</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="position Name"
                variant="outlined"
                fullWidth
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status"
                >
                  {/* <MenuItem value="">All</MenuItem> */}
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={handleResetFilter}>
              Reset
            </Button>
            <Button variant="contained" onClick={handleFilterChange}>
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
