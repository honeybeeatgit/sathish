import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Span } from "app/components/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const suggestions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" }
];

const status = [
  { label: "Active", value: "1" },
  { label: "InActive", value: "2" }
];

const BranchEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    email: "",
    creditCard: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    branch_option: null // ✅ new field for autocomplete
  });

  useEffect(() => {
    fetch(`/api/branches/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Match suggestion based on value
        const selectedOption = suggestions.find((opt) => opt.value === data.branch_option);
        setFormData({ ...data, branch_option: selectedOption || null });
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data to send, maybe just value from autocomplete
    const payload = {
      ...formData,
      branch_option: formData.branch_option?.value || "" // Just value
    };

    fetch(`/api/branches/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => navigate("/master/branch"));
  };

  return (
    <div>
      <h2>Edit Branch</h2>
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
              name="branch_pincode"
              value={formData.branch_pincode}
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
              value={formData.branch_option}
              onChange={(event, newValue) => setFormData({ ...formData, branch_option: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Select State" variant="outlined" fullWidth required />
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
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              value={formData.branch_option}
              onChange={(event, newValue) => setFormData({ ...formData, branch_option: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Status"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="success" type="submit" sx={{ mr: 2 }}>
          <Icon>forward</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/branch")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default BranchEdit;
