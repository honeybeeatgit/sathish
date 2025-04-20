import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import OwnerAdd from "./OwnerAdd";
import OwnerList from "./OwnerList";
import OwnerEdit from "./OwnerEdit";
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
            { name: "owner", path: "/master/owner" }
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Routes>
            <Route path="/" element={<OwnerList />} />
            <Route path="add" element={<OwnerAdd />} />
            <Route path="edit/:id" element={<OwnerEdit />} />
          </Routes>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
