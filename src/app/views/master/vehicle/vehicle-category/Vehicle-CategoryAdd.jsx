import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";

const VehiclecategoryAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    VehicleCategory_code: "",
    VehicleCategory_name: "",
    VehicleCategory_email: "",
    VehicleCategory_pin_code: "",
    VehicleCategory_mobile: "",
    VehicleCategory_address: ""
  });

  const [error, setError] = useState("");


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/swathi-transport/backend/api/VehicleCategory/VehicleCategory-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("VehicleCategory added successfully!");
        setFormData({
          VehicleCategory_code: "",
          VehicleCategory_name: "",
          VehicleCategory_email: "",
          VehicleCategory_pin_code: "",
          VehicleCategory_mobile: "",
          VehicleCategory_address: ""
        });
        navigate("/master/VehicleCategory");
      }
    } catch (err) {
      setError("Failed to add VehicleCategory. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add VehicleCategory</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="VehicleCategory_name"
              value={formData.VehicleCategory_name}
              onChange={handleChange}
              label="Name"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              type="email"
              name="VehicleCategory_Rate_km"
              value={formData.VehicleCategory_email}
              onChange={handleChange}
              label="Rate / KM"
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              type="number"
              name="VehicleCategory_run_km_day"
              value={formData.VehicleCategory_pin_code}
              onChange={handleChange}
              label="Run KM / Day"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="VehicleCategory_remarks"
              value={formData.VehicleCategory_mobile}
              onChange={handleChange}
              label="Remarks"
              required
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/vehicle-category")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default VehiclecategoryAdd;
