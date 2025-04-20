import { lazy } from "react";
import Loadable from "app/components/Loadable";

// routes for Common
const Branch = Loadable(lazy(() => import("./common/branch/Appbranch")));
const Customer = Loadable(lazy(() => import("./common/customer/Appcustomer")));
const Consigne = Loadable(lazy(() => import("./common/station/Appstation")));
const Tank = Loadable(lazy(() => import("./common/tank/Apptank")));
const InsuranceCompany = Loadable(
  lazy(() => import("./common/Insurance-Company/Appinsurance-Company"))
);
const Bunk = Loadable(lazy(() => import("./common/bunk/Appbunk")));
const Supplier = Loadable(lazy(() => import("./common/supplier/Appsupplier")));

// routes for Vehicle
const Make = Loadable(lazy(() => import("./vehicle/make/Appmake")));
const Owner = Loadable(lazy(() => import("./vehicle/owner/Appowner")));
const VehicleCategory = Loadable(lazy(() => import("./vehicle/vehicle-category/Appvehicle-category")));
const Position = Loadable(lazy(() => import("./vehicle/position/Appposition")));
const VehicleType = Loadable(lazy(() => import("./vehicle/vehicle-type/Appvehicle-type")));

const masterRoutes = [
  // common
  { path: "/master/branch", element: <Branch /> },
  { path: "/master/customer", element: <Customer /> },
  { path: "/master/station", element: <Consigne /> },
  { path: "/master/tank", element: <Tank /> },
  { path: "/master/insurance-company", element: <InsuranceCompany /> },
  { path: "/master/bunk", element: <Bunk /> },
  { path: "/master/supplier", element: <Supplier /> },
  // Vehicle
  { path: "/master/make", element: <Make /> },
  { path: "/master/owner", element: <Owner /> },
  { path: "/master/vehicle-category", element: <VehicleCategory /> },
  { path: "/master/position", element: <Position /> },
  { path: "/master/vehicle-type", element: <VehicleType /> }
];

export default masterRoutes;
