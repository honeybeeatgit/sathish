import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import VehiclecategoryAdd from "./Vehicle-CategoryAdd";
import VehiclecategoryList from "./Vehicle-CategoryList";
import VehiclecategoryEdit from "./Vehicle-CategoryEdit";
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
            { name: "vehicle-category", path: "/master/vehicle-category" }
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Routes>
            <Route path="/" element={<VehiclecategoryList />} />
            <Route path="add" element={<VehiclecategoryAdd />} />
            <Route path="edit/:id" element={<VehiclecategoryEdit />} />
          </Routes>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
