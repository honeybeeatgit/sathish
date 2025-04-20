import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import VehicleTypeAdd from "./Vehicle-TypeAdd";
import VehicleTypeList from "./Vehicle-TypeList";
import VehicleTypeEdit from "./Vehicle-TypeEdit";
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
        <Breadcrumb
          routeSegments={[
            { name: "Master", path: "/master" },
            { name: "vehicle-type", path: "/master/vehicle-type" }
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Routes>
            <Route path="/" element={<VehicleTypeList />} />
            <Route path="add" element={<VehicleTypeAdd />} />
            <Route path="edit/:id" element={<VehicleTypeEdit />} />
          </Routes>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
