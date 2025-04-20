import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import TankAdd from "./TankAdd";
import TankEdit from "./TankEdit";
import TankList from "./TankList";
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
        <Breadcrumb routeSegments={[{ name: "Master", path: "/master" }, { name: "tank", path: "/master/tank" }]} />
      </Box>

      <Stack spacing={3}>
              <SimpleCard>
                <Routes>
                  <Route path="/" element={<TankList />} />
                  <Route path="add" element={<TankAdd />} />
                  <Route path="edit/:id" element={<TankEdit />} />
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
