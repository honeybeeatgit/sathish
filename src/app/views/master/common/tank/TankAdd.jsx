import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";

const TankAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tank_code: "",
    tank_name: "",
    tank_email: "",
    tank_pin_code: "",
    tank_mobile: "",
    tank_address: "",
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
        "http://localhost/swathi-transport/backend/api/tank/tank-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("tank added successfully!");
        setFormData({
          tank_code: "",
          tank_name: "",
          tank_email: "",
          tank_pin_code: "",
          tank_mobile: "",
          tank_address: "",
        });
        navigate("/master/tank");
      }

    } catch (err) {
      setError("Failed to add tank. Please try again." + err);
    }
  };  return (    
  <div>
      <h2>Add tank</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="tank_name" value={formData.tank_name} onChange={handleChange} label="Name" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="tank_capacity" value={formData.tank_capacity} onChange={handleChange} label="Capacity" required />
          </Grid>

        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/tank")}>
          Back
        </Button>
      </form>
    </div>
  );
};
export default TankAdd;
