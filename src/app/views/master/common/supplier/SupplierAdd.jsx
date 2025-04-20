import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const SupplierAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplier_code: "",
    supplier_name: "",
    supplier_email: "",
    supplier_pin_code: "",
    supplier_mobile: "",
    supplier_address: "",
  });

  const [error, setError] = useState("");

  const suggestions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ]; // ✅ Define options

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/swathi-transport/backend/api/supplier/supplier-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("supplier added successfully!");
        setFormData({
          supplier_code: "",
          supplier_name: "",
          supplier_email: "",
          supplier_pin_code: "",
          supplier_mobile: "",
          supplier_address: "",
        });
        navigate("/master/supplier");
      }
    } catch (err) {
      setError("Failed to add supplier. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add supplier</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_name" value={formData.supplier_name} onChange={handleChange} label="Name" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_address" value={formData.supplier_address} onChange={handleChange} label="Address" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_postal_code" value={formData.supplier_address} onChange={handleChange} label="Postal Code" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_contact_no" value={formData.supplier_email} onChange={handleChange} label="Conatct No" />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth type="email" name="supplier_email" value={formData.supplier_pin_code} onChange={handleChange} label="Email" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_gst_no" value={formData.supplier_pin_code} onChange={handleChange} label="GST No" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_pan_no" value={formData.supplier_pin_code} onChange={handleChange} label="PAN No" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_range" value={formData.supplier_pin_code} onChange={handleChange} label="Range" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_division" value={formData.supplier_pin_code} onChange={handleChange} label="Division" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="supplier_Credit_Limit" value={formData.supplier_pin_code} onChange={handleChange} label="Credit_Limit" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth type="number" name="supplier_payment_days" value={formData.supplier_pin_code} onChange={handleChange} label="Payment Days" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Account Group " variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Sub Group " variant="outlined" fullWidth />}
            />
          </Grid>
        </Grid>


        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/supplier")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default SupplierAdd;
