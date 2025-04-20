import AppBar from "@mui/material/AppBar";
// import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, styled, useTheme } from "@mui/material/styles";

import { Paragraph, Span } from "./Typography";
import useSettings from "app/hooks/useSettings";
import { topBarHeight } from "app/utils/constant";

// STYLED COMPONENTS
const AppFooter = styled(Toolbar)(() => ({
  display: "flex",
  alignItems: "center",
  minHeight: topBarHeight,
  "@media (max-width: 499px)": {
    display: "table",
    width: "100%",
    minHeight: "auto",
    padding: "1rem 0",
    "& .container": {
      flexDirection: "column !important",
      "& a": { margin: "0 0 16px !important" }
    }
  }
}));

const FooterContent = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "0px 1rem",
  maxWidth: "1170px",
  margin: "0 auto"
}));

export default function Footer() {
  const theme = useTheme();
  const { settings } = useSettings();

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static" sx={{ zIndex: 96 }}>
        <AppFooter>
          <FooterContent>
            {/* <a href="https://ui-lib.com/downloads/matx-pro-react-admin/">
              <Button variant="contained" color="secondary">
              Swathi Transport Limited... All rights reserved. v1.0.0
              </Button>
            </a> */}
            <Paragraph m={0}>
            Swathi Transport Limited... All rights reserved. v1.0.0
            </Paragraph>

            <Span m="auto" />

            <Paragraph m={0}>
              Software Developed & Maintained by 
              <img 
                src="http://localhost/ovum-canteen/assets/img/logo/ara.svg" 
                alt="Logo" 
                height={30} 
                width={30} 
                style={{ padding: 4, verticalAlign: "middle" }} 
              />
            </Paragraph>
          </FooterContent>
        </AppFooter>
      </AppBar>
    </ThemeProvider>
  );
}
