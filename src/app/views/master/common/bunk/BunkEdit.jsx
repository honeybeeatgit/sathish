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

const BunkEdit = () => {
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
    bunk_option: null, // ✅ new field for autocomplete
  });

  useEffect(() => {
    fetch(`/api/bunkes/${id}`)
      .then(response => response.json())
      .then(data => {
        // Match suggestion based on value
        const selectedOption = suggestions.find(opt => opt.value === data.bunk_option);
        setFormData({ ...data, bunk_option: selectedOption || null });
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
      bunk_option: formData.bunk_option?.value || "", // Just value
    };

    fetch(`/api/bunkes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => navigate("/master/bunk"));
  };

  return (
    <div>
      <h2>Edit bunk</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="bunk_name" value={formData.bunk_name} onChange={handleChange} label="Name" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="bunk_address" value={formData.bunk_address} onChange={handleChange} label="Address" required />
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
            <TextField fullWidth name="bunk_postal_code" value={formData.bunk_address} onChange={handleChange} label="Postal Code" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="bunk_contact_no" value={formData.bunk_email} onChange={handleChange} label="Conatct No" />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth type="email" name="bunk_email" value={formData.bunk_pin_code} onChange={handleChange} label="Email" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Account type" variant="outlined" fullWidth />}
            />
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
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              value={formData.bunk_option}
              onChange={(event, newValue) =>
                setFormData({ ...formData, bunk_option: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Status" variant="outlined" fullWidth required/>
              )}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="success" type="submit" sx={{ mr: 2 }}>
          <Icon>forward</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/bunk")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default BunkEdit;
