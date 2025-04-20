import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Span } from "app/components/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const suggestions = [
    { label: "RUNNING", value: "1" },
    { label: "ARRIVED", value: "2" },
  ]; // ✅ Define options

const status = [
  { label: "Active", value: "1" },
  { label: "InActive", value: "2" }
];

const PositionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    position_name: "",
  });

  useEffect(() => {
    fetch(`/api/positiones/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Match suggestion based on value
        const selectedOption = suggestions.find((opt) => opt.value === data.position_option);
        setFormData({ ...data, position_option: selectedOption || null });
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
      position_option: formData.position_option?.value || "" // Just value
    };

    fetch(`/api/positiones/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => navigate("/master/position"));
  };

  return (
    <div>
      <h2>Edit position</h2>
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
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              value={formData.position_option}
              onChange={(event, newValue) => setFormData({ ...formData, position_option: newValue })}
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
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/position")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default PositionEdit;
