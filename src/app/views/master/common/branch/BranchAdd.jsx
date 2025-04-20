import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const BranchAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch_code: "",
    branch_name: "",
    branch_email: "",
    branch_pin_code: "",
    branch_mobile: "",
    branch_address: ""
  });

  const [error, setError] = useState("");

  const suggestions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" }
  ]; // ✅ Define options

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/swathi-transport/backend/api/branch/branch-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("Branch added successfully!");
        setFormData({
          branch_code: "",
          branch_name: "",
          branch_email: "",
          branch_pin_code: "",
          branch_mobile: "",
          branch_address: ""
        });
        navigate("/master/branch");
      }
    } catch (err) {
      setError("Failed to add branch. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add Branch</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="branch_code"
              value={formData.branch_code}
              onChange={handleChange}
              label="Code"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="branch_name"
              value={formData.branch_name}
              onChange={handleChange}
              label="Name"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              type="email"
              name="branch_email"
              value={formData.branch_email}
              onChange={handleChange}
              label="Email"
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              type="number"
              name="branch_pin_code"
              value={formData.branch_pin_code}
              onChange={handleChange}
              label="Pincode"
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="branch_mobile"
              value={formData.branch_mobile}
              onChange={handleChange}
              label="Contact"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select State" variant="outlined" fullWidth />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="branch_address"
              value={formData.branch_address}
              onChange={handleChange}
              label="Address"
              required
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/branch")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default BranchAdd;
