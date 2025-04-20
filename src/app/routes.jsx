import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import masterRoutes from "./views/master/masterRoutes";

// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

//MASTER ROUTES -Common
const Branch = Loadable(lazy(() => import("app/views/master/common/branch/Appbranch")));
const Customer = Loadable(lazy(() => import("app/views/master/common/customer/Appcustomer")));
const Station = Loadable(lazy(() => import("app/views/master/common/station/Appstation")));
const Tank = Loadable(lazy(() => import("app/views/master/common/tank/Apptank")));
const InsuranceCompany = Loadable(
  lazy(() => import("app/views/master/common/insurance-company/Appinsurance-Company"))
);
const Bunk = Loadable(lazy(() => import("app/views/master/common/bunk/Appbunk")));
const Supplier = Loadable(lazy(() => import("app/views/master/common/supplier/Appsupplier")));

//MASTER ROUTES -Vehcile
const Make = Loadable(lazy(() => import("app/views/master/vehicle/make/Appmake")));
const Owner = Loadable(lazy(() => import("app/views/master/vehicle/owner/Appowner")));
const VehicleCategory = Loadable(
  lazy(() => import("app/views/master/vehicle/vehicle-category/Appvehicle-category"))
);
const Position = Loadable(lazy(() => import("app/views/master/vehicle/position/Appposition")));
const VehicleType = Loadable(
  lazy(() => import("app/views/master/vehicle/vehicle-type/Appvehicle-type"))
);

const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },

  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...masterRoutes,
      // common
      // Branch route
      { path: "/master/branch/*", element: <Branch />, auth: authRoles.admin },
      // Customer route
      { path: "/master/customer/*", element: <Customer />, auth: authRoles.admin },
      // Station route
      { path: "/master/station/*", element: <Station />, auth: authRoles.admin },
      // Tank route
      { path: "/master/tank/*", element: <Tank />, auth: authRoles.admin },
      // Insurance Company route
      { path: "/master/insurance-company/*", element: <InsuranceCompany />, auth: authRoles.admin },
      // Bunk route
      { path: "/master/bunk/*", element: <Bunk />, auth: authRoles.admin },
      // Supplier route
      { path: "/master/supplier/*", element: <Supplier />, auth: authRoles.admin },

      // Vehicle
      // Make route
      { path: "/master/make/*", element: <Make />, auth: authRoles.admin },
      // Owner route
      { path: "/master/owner/*", element: <Owner />, auth: authRoles.admin },
      // Vehicle Category route
      { path: "/master/vehicle-category/*", element: <VehicleCategory />, auth: authRoles.admin },
      // Position route
      { path: "/master/position/*", element: <Position />, auth: authRoles.admin },
      // Vehicle Type route
      { path: "/master/vehicle-type/*", element: <VehicleType />, auth: authRoles.admin }
    ]
  },

  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  ...sessionRoutes
];

export default routes;
