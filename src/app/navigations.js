const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },

  {label: "Master", type: "label"},
  {
    name: "Master",
    icon: "widgets",
    children: [
      { 
        name: "Common", 
        path: "/master/common", 
        iconText: "A",
        children: [
          { name: "Branch", iconText: "B", path: "/master/branch" },
          { name: "Customer", iconText: "C", path: "/master/customer" },
          { name: "Station", iconText: "S", path: "/master/station" },
          { name: "Tank", iconText: "T", path: "/master/tank" },
          { name: "Insurance Company", iconText: "IC", path: "/master/insurance-company" },
          { name: "Bunk", iconText: "BU", path: "/master/bunk" },
          { name: "Supplier", iconText: "VT", path: "/master/supplier" },
        ]
      },
      { 
        name: "Vehicle", 
        path: "/master/vehicle", 
        iconText: "A",
        children: [
          { name: "Make", iconText: "M", path: "/master/make" },
          { name: "Owner", iconText: "O", path: "/master/owner" },
          { name: "position", iconText: "P", path: "/master/position" },
          { name: "Vehicle Category", iconText: "VC", path: "/master/vehicle-category" },
          { name: "Vehicle Type", iconText: "IC", path: "/master/vehicle-type" },
          { name: "Vehicle Finanace", iconText: "BU", path: "/master/vehicle-finanace" },
          { name: "Supplier", iconText: "VT", path: "/master/supplier" },
        ]
      },
      // {
      //   name: "Vehicle", 
      //   path: "/master/Vehicle", 
      //   iconText: "A",
      //   children: [
      //     { name: "Branch", iconText: "SI", path: "/master/branch" },
      //     { name: "Customer", iconText: "SU", path: "/master/Customer" },
      //     { name: "Consigne", iconText: "FP", path: "/master/consigne" },
      //   ]
      // },
      // { name: "Consigne", path: "/master/consigne", iconText: "B" },
      // { name: "Route Configuration", path: "/master/route-configuration", iconText: "C" },
      // { name: "Branch", path: "/master/branch", iconText: "D" },
    ]
  },

  { label: "PAGES", type: "label" },
  {
    name: "Session/Auth",
    icon: "security",
    children: [
      { name: "Sign in", iconText: "SI", path: "/session/signin" },
      { name: "Sign up", iconText: "SU", path: "/session/signup" },
      { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
      { name: "Error", iconText: "404", path: "/session/404" }
    ]
  },
  // { label: "Components", type: "label" },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
  //   children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  // },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }

];
export default navigations;
