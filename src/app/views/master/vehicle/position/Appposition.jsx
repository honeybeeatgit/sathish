import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PositionAdd from "./PositionAdd";
import PositionList from "./PositionList";
import PositionEdit from "./PositionEdit";
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
            { name: "position", path: "/master/position" }
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Routes>
            <Route path="/" element={<PositionList />} />
            <Route path="add" element={<PositionAdd />} />
            <Route path="edit/:id" element={<PositionEdit />} />
          </Routes>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
