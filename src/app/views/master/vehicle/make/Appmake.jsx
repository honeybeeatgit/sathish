import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import MakeAdd from "./MakeAdd";
import MakeList from "./MakeList";
import MakeEdit from "./MakeEdit";
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
            { name: "Make", path: "/master/make" }
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Routes>
            <Route path="/" element={<MakeList />} />
            <Route path="add" element={<MakeAdd />} />
            <Route path="edit/:id" element={<MakeEdit />} />
          </Routes>
        </SimpleCard>
      </Stack>
    </Container>
  );
}
