import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SupplierAdd from "./SupplierAdd";
import SupplierList from "./SupplierList";
import SupplierEdit from "./SupplierEdit";
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
        <Breadcrumb routeSegments={[{ name: "Master", path: "/master" }, { name: "supplier", path: "/master/supplier" }]} />
      </Box>

      <Stack spacing={3} >
        <SimpleCard>
          <Routes>
            <Route path="/" element={<SupplierList />} />
            <Route path="add" element={<SupplierAdd />} />
            <Route path="edit/:id" element={<SupplierEdit />} />
          </Routes>
        </SimpleCard>

      </Stack>
    </Container>
  );
}

