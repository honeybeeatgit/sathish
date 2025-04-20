import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const PositionAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position_name: "",
  });

  const [error, setError] = useState("");


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const suggestions = [
    { label: "RUNNING", value: "1" },
    { label: "ARRIVED", value: "2" },
  ]; // ✅ Define options

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/swathi-transport/backend/api/position/position-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("position added successfully!");
        setFormData({
          position_name: "",
        });
        navigate("/master/position");
      }
    } catch (err) {
      setError("Failed to add position. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add position</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="position_name"
              value={formData.position_name}
              onChange={handleChange}
              label="position Name"
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
                renderInput={(params) => <TextField {...params} label="Select Position Type" variant="outlined" fullWidth />}
                />
            </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/position")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default PositionAdd;
