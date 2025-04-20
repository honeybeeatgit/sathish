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

const OwnerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    owner_name: "",
  });

  useEffect(() => {
    fetch(`/api/owneres/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Match suggestion based on value
        const selectedOption = suggestions.find((opt) => opt.value === data.owner_option);
        setFormData({ ...data, owner_option: selectedOption || null });
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
      owner_option: formData.owner_option?.value || "" // Just value
    };

    fetch(`/api/owneres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => navigate("/master/owner"));
  };

  return (
    <div>
      <h2>Edit owner</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField
              fullWidth
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              label="Owner Name"
              required
            />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={status}
              getOptionLabel={(option) => option.label}
              value={formData.owner_option}
              onChange={(event, newValue) => setFormData({ ...formData, owner_option: newValue })}
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
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/owner")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default OwnerEdit;
