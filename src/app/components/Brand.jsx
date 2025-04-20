import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import { Span } from "./Typography";
import { MatxLogo } from "app/components";
import useSettings from "app/hooks/useSettings";

// STYLED COMPONENTS
const BrandRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px"
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: ".5rem",
  display: mode === "compact" ? "none" : "block"
}));

export default function Brand({ children }) {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  const CustomLogoWrapper = styled("div")({
    "& img": {
      width: "100% !important",
      height: "25px !important"
    }
  });

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
         <CustomLogoWrapper>
          <MatxLogo />
        </CustomLogoWrapper>
        <StyledSpan mode={mode} className="sidenavHoverShow">
          Swathi Transport
        </StyledSpan>
      </Box>

      <Box className="sidenavHoverShow" sx={{ display: mode === "compact" ? "none" : "block" }}>
        {children || null}
      </Box>
    </BrandRoot>
  );
}
