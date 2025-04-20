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

export default function VehicleCategoryList() {
  const navigate = useNavigate();
  const [VehicleCategoryes, setVehicleCategoryes] = useState([
    { id: 1, name: "Main VehicleCategory", address: "main@example.com", status: "Active" },
    { id: 2, name: "West VehicleCategory", address: "west@example.com", status: "Inactive" },
    { id: 3, name: "East VehicleCategory", address: "east@example.com", status: "Cancelled" },
    { id: 4, name: "North VehicleCategory", address: "north@example.com", status: "Active" },
    { id: 5, name: "South VehicleCategory", address: "south@example.com", status: "Inactive" },
    { id: 6, name: "South VehicleCategory", address: "south@example.com", status: "Inactive" }
  ]);

  const [filteredVehicleCategoryes, setFilteredVehicleCategoryes] = useState(VehicleCategoryes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("/api/VehicleCategoryes")
      .then((response) => response.json())
      .then((data) => {
        setVehicleCategoryes(data);
        setFilteredVehicleCategoryes(data);
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

  // Delete VehicleCategory
  const handleOpenDeleteDialog = (VehicleCategory) => {
    setSelectedVehicleCategory(VehicleCategory);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteReason("");
  };

  const handleDelete = () => {
    if (!deleteReason.trim()) return; // Prevent deleting without reason

    console.log(`Deleting VehicleCategory: ${selectedVehicleCategory.name} for reason: ${deleteReason}`);
    const updatedVehicleCategoryes = VehicleCategoryes.filter((b) => b.id !== selectedVehicleCategory.id);
    setVehicleCategoryes(updatedVehicleCategoryes);
    setFilteredVehicleCategoryes(updatedVehicleCategoryes);
    handleCloseDelete();
  };

  // Filter VehicleCategoryes
  const handleFilterChange = () => {
    let filtered = VehicleCategoryes;
    if (filterName.trim()) {
      filtered = filtered.filter((b) => b.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterStatus) {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }
    setFilteredVehicleCategoryes(filtered);
    handleCloseFilter();
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("");
    setFilteredVehicleCategoryes(VehicleCategoryes);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredVehicleCategoryes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "VehicleCategoryes");
    XLSX.writeFile(wb, "VehicleCategoryes.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("VehicleCategory List", 14, 10);

    const tableColumn = ["VehicleCategory", "Email", "Status"];
    const tableRows = filteredVehicleCategoryes.map((VehicleCategory) => [
      VehicleCategory.name,
      VehicleCategory.address,
      VehicleCategory.status
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });

    doc.save("VehicleCategoryes.pdf");
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <h2>VehicleCategory List</h2>
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
            Add VehicleCategory
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
                <b>VehicleCategory</b>
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
            {filteredVehicleCategoryes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((VehicleCategory) => (
                <TableRow key={VehicleCategory.id}>
                  <TableCell align="center">{VehicleCategory.name}</TableCell>
                  <TableCell align="center">{VehicleCategory.address}</TableCell>
                  <TableCell align="center">{VehicleCategory.status}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/master/vehicle-category/edit/${VehicleCategory.id}`)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(VehicleCategory)}>
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
        count={filteredVehicleCategoryes.length}
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
            Are you sure you want to delete <b>{selectedVehicleCategory?.name}</b>?
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
          <h3>Filter VehicleCategoryes</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="VehicleCategory Name"
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
