import React from "react";
import DashboardBranch from "./views/dashboard/DashboardBranch";

const Test = React.lazy(() => import("./views/base/tables/Tables"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
// const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import("./views/users/User"));
const ChangePassword = React.lazy(() => import("./views/users/ChangePassword"));
const UserUpdate = React.lazy(() => import("./views/users/UserUpdate"));
const Rit = React.lazy(() => import("./views/rit/RitDetails"));
const RitUploadStatus = React.lazy(() => import("./views/rit/RitUploadStatus"));
const RitDownload = React.lazy(() => import("./views/rit/RitDownload"));
const ReportRitBaseDateWise = React.lazy(() =>
  import("./views/reports/upload_status/ritBaseDateWise")
);
const ReportRitBankWise = React.lazy(() =>
  import("./views/reports/upload_status/ritBankWise")
);
const ReportNRBankBranch = React.lazy(() =>
  import("./views/reports/upload_status/nonReportingBankBranch")
);
const UserList = React.lazy(() => import("./views/users/userList"));
const AddUser = React.lazy(() => import("./views/users/AddUser"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/test", name: "Test", component: Test },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: "/users", exact: true, name: "Users", component: UserList },
  { path: "/user/add", exact: true, name: "Add User", component: AddUser },
  {
    path: "/user/change-password",
    exact: true,
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/users/update/:id",
    exact: true,
    name: "User Update",
    component: UserUpdate,
  },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/rit", exact: true, name: "Rit", component: Rit },
  {
    path: "/rit/upload",
    exact: true,
    name: "Rit Upload",
    component: DashboardBranch,
  },
  {
    path: "/rit/upload-status",
    name: "Rit Upload Status",
    component: RitUploadStatus,
  },
  { path: "/rit/download", name: "Rit Download", component: RitDownload },
  // { path: '/report', name: 'Report', component: ReportRitBaseDateWise },
  {
    path: "/report/rit-base-date-wise",
    name: "Rit Report Base Date Wise",
    component: ReportRitBaseDateWise,
  },
  {
    path: "/report/rit-bank-wise",
    name: "Rit Report Bank Wise",
    component: ReportRitBankWise,
  },
  {
    path: "/report/non-reporting-bank-branch",
    name: "Non Reporting Bank Branch",
    component: ReportNRBankBranch,
  },
  // { path: '/rit/:id', exact: true, name: 'Rit Details', component: User }
];

export default routes;
