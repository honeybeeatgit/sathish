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
  MenuItem,
} from "@mui/material";
import { Delete, Edit, FilterList } from "@mui/icons-material";
// import Grid from "@mui/material/Grid"; 
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function StationList() {
  const navigate = useNavigate();
  const [stationes, setstationes] = useState([
    { id: 1, name: "Main station", address: "main@example.com", status: "Active" },
    { id: 2, name: "West station", address: "west@example.com", status: "Inactive" },
    { id: 3, name: "East station", address: "east@example.com", status: "Cancelled" },
    { id: 4, name: "North station", address: "north@example.com", status: "Active" },
    { id: 5, name: "South station", address: "south@example.com", status: "Inactive" },
    { id: 6, name: "South station", address: "south@example.com", status: "Inactive" },
  ]);

  const [filteredstationes, setFilteredstationes] = useState(stationes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedstation, setSelectedstation] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("/api/stationes")
      .then((response) => response.json())
      .then((data) => {
        setstationes(data);
        setFilteredstationes(data);
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

  // Delete station
  const handleOpenDeleteDialog = (station) => {
    setSelectedstation(station);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteReason("");
  };

  const handleDelete = () => {
    if (!deleteReason.trim()) return; // Prevent deleting without reason

    console.log(`Deleting station: ${selectedstation.name} for reason: ${deleteReason}`);
    const updatedstationes = stationes.filter((b) => b.id !== selectedstation.id);
    setstationes(updatedstationes);
    setFilteredstationes(updatedstationes);
    handleCloseDelete();
  };

  // Filter stationes
  const handleFilterChange = () => {
    let filtered = stationes;
    if (filterName.trim()) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }
    setFilteredstationes(filtered);
    handleCloseFilter();
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("");
    setFilteredstationes(stationes);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredstationes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "stationes");
    XLSX.writeFile(wb, "stationes.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("station List", 14, 10);
  
    const tableColumn = ["station", "Email", "Status"];
    const tableRows = filteredstationes.map((station) => [
      station.name,
      station.address,
      station.status,
    ]);
  
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
  
    doc.save("stationes.pdf");
  };
  
  
  

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <h2>station List</h2>
          <IconButton color="primary" onClick={handleOpenFilter}>
            <FilterList />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
        <Button variant="contained" color="primary" onClick={() => navigate("add")} md={6} xs={12} lg={3}>
          Add station
        </Button>
        <Button variant="contained" color="success" onClick={exportToExcel}>Export to Excel</Button>
        <Button variant="contained" color="secondary" onClick={exportToPDF}>Export to PDF</Button>
        </Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>station</b></TableCell>
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
              <TableCell align="center"><b>Edit</b></TableCell>
              <TableCell align="center"><b>Delete</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredstationes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((station) => (
                <TableRow key={station.id}>
                  <TableCell align="center">{station.name}</TableCell>
                  <TableCell align="center">{station.address}</TableCell>
                  <TableCell align="center">{station.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => navigate(`/master/station/edit/${station.id}`)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(station)}>
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
        count={filteredstationes.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Box mt={2}>
        {/* <h2>Reports</h2> */}
        
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete <b>
            {selectedstation?.name}
            </b>?</p>
          <TextField fullWidth label="Reason for Delete" value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} margin="dense"/>
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
        <h3>Filter stationes</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="station Name" variant="outlined" fullWidth value={filterName} onChange={(e) => setFilterName(e.target.value)}/>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
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
