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

const MakeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    c: "", // ✅ new field for autocomplete
  });

  useEffect(() => {
    fetch(`/api/makees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Match suggestion based on value
        const selectedOption = suggestions.find((opt) => opt.value === data.make_option);
        setFormData({ ...data, make_option: selectedOption || null });
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
      make_option: formData.make_option?.value || "" // Just value
    };

    fetch(`/api/makees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => navigate("/master/make"));
  };

  return (
    <div>
      <h2>Edit make</h2>
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
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              value={formData.make_option}
              onChange={(event, newValue) => setFormData({ ...formData, make_option: newValue })}
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
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/make")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default MakeEdit;
