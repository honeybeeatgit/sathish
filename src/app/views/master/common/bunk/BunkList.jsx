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


export default function BunkList() {
  const navigate = useNavigate();
  const [bunkes, setbunkes] = useState([
    { id: 1, name: "Main bunk", address: "main@example.com", status: "Active" },
    { id: 2, name: "West bunk", address: "west@example.com", status: "Inactive" },
    { id: 3, name: "East bunk", address: "east@example.com", status: "Cancelled" },
    { id: 4, name: "North bunk", address: "north@example.com", status: "Active" },
    { id: 5, name: "South bunk", address: "south@example.com", status: "Inactive" },
    { id: 6, name: "South bunk", address: "south@example.com", status: "Inactive" },
  ]);

  const [filteredbunkes, setFilteredbunkes] = useState(bunkes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedbunk, setSelectedbunk] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetch("/api/bunkes")
      .then((response) => response.json())
      .then((data) => {
        setbunkes(data);
        setFilteredbunkes(data);
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

  // Delete bunk
  const handleOpenDeleteDialog = (bunk) => {
    setSelectedbunk(bunk);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteReason("");
  };

  const handleDelete = () => {
    if (!deleteReason.trim()) return; // Prevent deleting without reason

    console.log(`Deleting bunk: ${selectedbunk.name} for reason: ${deleteReason}`);
    const updatedbunkes = bunkes.filter((b) => b.id !== selectedbunk.id);
    setbunkes(updatedbunkes);
    setFilteredbunkes(updatedbunkes);
    handleCloseDelete();
  };

  // Filter bunkes
  const handleFilterChange = () => {
    let filtered = bunkes;
    if (filterName.trim()) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }
    setFilteredbunkes(filtered);
    handleCloseFilter();
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("");
    setFilteredbunkes(bunkes);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredbunkes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "bunkes");
    XLSX.writeFile(wb, "bunkes.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("bunk List", 14, 10);
  
    const tableColumn = ["bunk", "Email", "Status"];
    const tableRows = filteredbunkes.map((bunk) => [
      bunk.name,
      bunk.address,
      bunk.status,
    ]);
  
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
  
    doc.save("bunkes.pdf");
  };
  
  
  

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <h2>bunk List</h2>
          <IconButton color="primary" onClick={handleOpenFilter}>
            <FilterList />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
        <Button variant="contained" color="primary" onClick={() => navigate("add")} md={6} xs={12} lg={3}>
          Add bunk
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
              <TableCell align="center"><b>bunk</b></TableCell>
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
              <TableCell align="center"><b>Edit</b></TableCell>
              <TableCell align="center"><b>Delete</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredbunkes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bunk) => (
                <TableRow key={bunk.id}>
                  <TableCell align="center">{bunk.name}</TableCell>
                  <TableCell align="center">{bunk.address}</TableCell>
                  <TableCell align="center">{bunk.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => navigate(`/master/bunk/edit/${bunk.id}`)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(bunk)}>
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
        count={filteredbunkes.length}
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
            {selectedbunk?.name}
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
        <h3>Filter bunkes</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="bunk Name" variant="outlined" fullWidth value={filterName} onChange={(e) => setFilterName(e.target.value)}/>
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
