import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";

const VehicleTypeAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    VehicleType_code: "",
    VehicleType_name: "",
    VehicleType_email: "",
    VehicleType_pin_code: "",
    VehicleType_mobile: "",
    VehicleType_address: ""
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
        "http://localhost/swathi-transport/backend/api/VehicleType/VehicleType-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("VehicleType added successfully!");
        setFormData({
          VehicleType_code: "",
          VehicleType_name: "",
          VehicleType_email: "",
          VehicleType_pin_code: "",
          VehicleType_mobile: "",
          VehicleType_address: ""
        });
        navigate("/master/VehicleType");
      }
    } catch (err) {
      setError("Failed to add VehicleType. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add VehicleType</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/vehicle-type")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default VehicleTypeAdd;
