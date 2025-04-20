import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import InsuranceCompanyAdd from "./Insurance-CompanyAdd";
import InsuranceCompanyList from "./Insurance-CompanyList";
import InsuranceCompanyEdit from "./Insurance-CompanyEdit";
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
        <Breadcrumb routeSegments={[{ name: "Master", path: "/master" }, { name: "Insurance-Company", path: "/master/insurance-company" }]} />
      </Box>

      <Stack spacing={3} >
        <SimpleCard>
          <Routes>
            <Route path="/" element={<InsuranceCompanyList />} />
            <Route path="add" element={<InsuranceCompanyAdd />} />
            <Route path="edit/:id" element={<InsuranceCompanyEdit />} />
          </Routes>
        </SimpleCard>

      </Stack>
    </Container>
  );
}

