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

const VehicleTypeEdit = () => {
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
    VehicleType_option: null // ✅ new field for autocomplete
  });

  useEffect(() => {
    fetch(`/api/VehicleTypees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Match suggestion based on value
        const selectedOption = suggestions.find((opt) => opt.value === data.VehicleType_option);
        setFormData({ ...data, VehicleType_option: selectedOption || null });
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
      VehicleType_option: formData.VehicleType_option?.value || "" // Just value
    };

    fetch(`/api/VehicleTypees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => navigate("/master/VehicleType"));
  };

  return (
    <div>
      <h2>Edit VehicleType</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="Vehicle_Type_name"
              value={formData.VehicleType_name}
              onChange={handleChange}
              label="Type Name"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              type="email"
              name="Vehicle_no_of_wheels"
              value={formData.VehicleType_email}
              onChange={handleChange}
              label="No Of Wheels"
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              type="number"
              name="Vehicle_load_running"
              value={formData.VehicleType_pin_code}
              onChange={handleChange}
              label="Load Running(KM/Day)"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="Vehicle_empty_running"
              value={formData.VehicleType_mobile}
              onChange={handleChange}
              label="Empty Running(KM/Day)"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="Vehicle_load_average"
              value={formData.VehicleType_mobile}
              onChange={handleChange}
              label="Load Average(KM/Litre)"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="Vehicle_empty_average"
              value={formData.VehicleType_mobile}
              onChange={handleChange}
              label="Empty Average(KM/Litre)"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              value={formData.VehicleType_option}
              onChange={(event, newValue) => setFormData({ ...formData, VehicleType_option: newValue })}
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
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/vehicle-type")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default VehicleTypeEdit;
