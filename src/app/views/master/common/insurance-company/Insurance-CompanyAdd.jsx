import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Span } from "app/components/Typography";
import Autocomplete from "@mui/material/Autocomplete";

const InsuranceCompanyAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    InsuranceCompany_code: "",
    InsuranceCompany_name: "",
    InsuranceCompany_email: "",
    InsuranceCompany_pin_code: "",
    InsuranceCompany_mobile: "",
    InsuranceCompany_address: "",
  });

  const [error, setError] = useState("");

  const suggestions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ]; // ✅ Define options

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost/swathi-transport/backend/api/InsuranceCompany/InsuranceCompany-api.php?action=add",
        formData
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        alert("InsuranceCompany added successfully!");
        setFormData({
          InsuranceCompany_code: "",
          InsuranceCompany_name: "",
          InsuranceCompany_email: "",
          InsuranceCompany_pin_code: "",
          InsuranceCompany_mobile: "",
          InsuranceCompany_address: "",
        });
        navigate("/master/InsuranceCompany");
      }
    } catch (err) {
      setError("Failed to add InsuranceCompany. Please try again." + err);
    }
  };

  return (
    <div>
      <h2>Add InsuranceCompany</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="insurancecompany_name" value={formData.InsuranceCompany_code} onChange={handleChange} label="Company Name" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="insurancecompany_contactperson" value={formData.InsuranceCompany_name} onChange={handleChange} label="Contact Person" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="insurancecompany_Branch" value={formData.InsuranceCompany_email} onChange={handleChange} label="Branch" required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <TextField fullWidth name="insurancecompany_contactno" value={formData.InsuranceCompany_pin_code} onChange={handleChange} label="Contact No." required />
          </Grid>
          <Grid item md={6} xs={12} lg={3}>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                console.log("Selected option:", newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Select Account Group" variant="outlined" fullWidth />}
            />
          </Grid>
        </Grid>


        <Button color="primary" variant="contained" type="submit" sx={{ mr: 2 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/master/insurance-company")}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default InsuranceCompanyAdd;
