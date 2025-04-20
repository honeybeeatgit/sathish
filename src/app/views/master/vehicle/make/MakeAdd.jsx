import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";

const MakeAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make_name: "",
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
        "http://localhost/swathi-transport/backend/api/make/make-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("make added successfully!");
        setFormData({
          make_name: "",
        });
        navigate("/master/make");
      }
    } catch (err) {
      setError("Failed to add make. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add make</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="make_name"
              value={formData.make_name}
              onChange={handleChange}
              label="Make Name"
              required
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/make")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default MakeAdd;
