import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import StationAdd from "./StationAdd";
import StationEdit from "./StationEdit";
import StationList from "./StationList";
import { Routes, Route } from "react-router-dom";

// import StepperForm from "./StepperForm";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "15px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));

export default function AppForm() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Master", path: "/master" }, { name: "Station", path: "/master/station" }]} />
      </Box>

      <Stack spacing={3}>
              <SimpleCard>
                <Routes>
                  <Route path="/" element={<StationList />} />
                  <Route path="add" element={<StationAdd />} />
                  <Route path="edit/:id" element={<StationEdit />} />
                </Routes>
              </SimpleCard>
{/* 
        <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
}
