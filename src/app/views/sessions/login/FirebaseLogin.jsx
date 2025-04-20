import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";

import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Icon from "@mui/material/Icon";

// GLOBAL CUSTOM COMPONENTS
import MatxLogo from "app/components/MatxLogo";
import { Span } from "app/components/Typography";

// GLOBAL CUSTOM HOOKS
import useAuth from "app/hooks/useAuth";


const Finanacial_Year = [
  { label: "2025 - 2026", value: "1" },
  { label: "2024 - 2025", value: "2" },
  { label: "2023 - 2024", value: "3" }
];

const Logo = styled("div")({
  gap: 10,
  display: "flex",
  alignItems: "center",
  "& span": { fontSize: 26, lineHeight: 1.3, fontWeight: 800 }
});

const CustomLogoWrapper = styled("div")({
  "& img": {
    width: "100% !important",
    height: "120px !important"
  }
});

const FirebaseRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // background: "#1A2038",
  background: "#e6e9f0",
  minHeight: "100vh !important",
  "& .card": { maxWidth: 800, margin: "1rem" },
  "& .cardLeft": {
    color: "#fff",
    height: "100%",
    display: "flex",
    padding: "32px 56px",
    flexDirection: "column",
    backgroundSize: "cover",
    background: "#161c37 url(/assets/images/bg-3.png) no-repeat",
    [theme.breakpoints.down("sm")]: { minWidth: 200 },
    "& img": { width: 32, height: 32 } 
  },
  "& .mainTitle": {
    fontSize: 18,
    lineHeight: 1.3,
    marginBottom: 24
  },
  "& .item": {
    position: "relative",
    marginBottom: 12,
    paddingLeft: 16,
    "&::after": {
      top: 8,
      left: 0,
      width: 4,
      height: 4,
      content: '""',
      borderRadius: 4,
      position: "absolute",
      backgroundColor: theme.palette.error.main
    }
  }
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function FirebaseLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const handleFormSubmit = async (values) => {
    try {
      await signInWithEmail(values.email, values.password);
      navigate(state ? state.from : "/");
      enqueueSnackbar("Logged In Successfully", { variant: "success" });
    } catch (error) {
      alert(JSON.stringify(error, null, 4));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };


  return (
    <FirebaseRoot>
      <Card className="card">
        <Grid container>
          <Grid
            size={{ md: 6, xs: 12 }}
            display="flex"
            justifyContent="center"
            justifyItems={"center"}>
            <div className="cardLeft" style={{ padding: "20px 0px 20px 20px" }}>
              <Logo style={{ display: "flex", justifyContent: "center" }}>
                <CustomLogoWrapper style={{ marginTop: 10, textAlign: "center" }}>
                  <MatxLogo />
                </CustomLogoWrapper>
              </Logo>

              <Logo style={{ marginTop: 10, padding:20, textAlign: "center" }}>
                <span>Swathi Supply Chain Services Pvt Ltd</span>
              </Logo>

              <Span flexGrow={1}></Span>
            </div>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Box pt={9} pb={4} px={4}>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="UserName"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 3 }}
                    />

                    <Autocomplete
                      size="small"
                      options={Finanacial_Year}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, newValue) => {
                        console.log("Selected option:", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Financial Year" variant="outlined" fullWidth />
                      )}
                      sx={{ mb: 3 }}
                    />

                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}></Box>
                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}>
                        Change Password?
                      </NavLink>
                    </Box>

                    <Box display="flex" justifyContent="center">
                      <LoadingButton
                        type="submit"
                        color="primary"
                        loading={isSubmitting}
                        variant="contained"
                        sx={{ my: 2 }}>
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Login</Span>
                      </LoadingButton>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FirebaseRoot>
  );
}
