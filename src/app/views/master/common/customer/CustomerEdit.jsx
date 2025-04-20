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
  { label: "Option 3", value: "3" },
];

const status = [
  { label: "Active", value: "1" },
  { label: "InActive", value: "2" },
]

const CustomerEdit = () => {
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
    customer_option: null, // ✅ new field for autocomplete
  });

  useEffect(() => {
    fetch(`/api/customeres/${id}`)
      .then(response => response.json())
      .then(data => {
        // Match suggestion based on value
        const selectedOption = suggestions.find(opt => opt.value === data.customer_option);
        setFormData({ ...data, customer_option: selectedOption || null });
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
      customer_option: formData.customer_option?.value || "", // Just value
    };

    fetch(`/api/customeres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => navigate("/master/customer"));
  };

  return (
    <div>
      <h2>Edit customer</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_name" value={formData.customer_name} onChange={handleChange} label="Name" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_Address" value={formData.customer_Address} onChange={handleChange} label="Address" required />
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
            <TextField fullWidth name="customer_conatct" value={formData.customer_conatct} onChange={handleChange} label="Contact" required/>
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} label="Email" />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_pan" value={formData.customer_pan} onChange={handleChange} label="PAN" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_gst_no" value={formData.customer_gst_no} onChange={handleChange} label="GST No." required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_credit_limit" value={formData.customer_credit_limit} onChange={handleChange} label="Credit Limit" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_payment_days" value={formData.customer_payment_days} onChange={handleChange} label="Payment Days" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Loads" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Account Group" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Sub Group" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Incharge" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="customer_place" value={formData.customer_place} onChange={handleChange} label="Customer Place" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Status" variant="outlined" fullWidth />}
            />
          </Grid>

        </Grid>

        <Button variant="contained" color="success" type="submit" sx={{ mr: 2 }}>
          <Icon>forward</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/customer")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default CustomerEdit;
