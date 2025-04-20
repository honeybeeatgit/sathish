import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import BunkAdd from "./BunkAdd";
import BunkList from "./BunkList";
import BunkEdit from "./BunkEdit";
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
        <Breadcrumb routeSegments={[{ name: "Master", path: "/master" }, { name: "bunk", path: "/master/bunk" }]} />
      </Box>

      <Stack spacing={3} >
        <SimpleCard>
          <Routes>
            <Route path="/" element={<BunkList />} />
            <Route path="add" element={<BunkAdd />} />
            <Route path="edit/:id" element={<BunkEdit />} />
          </Routes>
        </SimpleCard>

      </Stack>
    </Container>
  );
}

