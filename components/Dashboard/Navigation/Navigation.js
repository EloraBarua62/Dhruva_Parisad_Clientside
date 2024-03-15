import AdminPanel from "../DataDisplay/AdminPanel/AdminPanel";
import DashboardHome from "../DataDisplay/DashboardHome/DashboardHome";
import NewResult from "../DataDisplay/NewResult/NewResult";
import NewStudentsDetails from "../DataDisplay/NewStudentsDetails/NewStudentsDetails";
import PreviousResult from "../DataDisplay/PreviousResult/PreviousResult";
import SchoolInformation from "../DataDisplay/SchoolInformation/SchoolInformation";
import UpdateNews from "../DataDisplay/UpdateNews/UpdateNews";

const allNavigation = [
  {
    id: 1,
    title: "Dashboard",
    role: "admin",
    status: "active",
    datatable: <DashboardHome />,
  },
  {
    id: 2,
    title: "New Result",
    role: "admin",
    status: "active",
    datatable: <NewResult />,
  },
  {
    id: 3,
    title: "New Student's Details",
    role: "admin",
    status: "active",
    datatable: <NewStudentsDetails />,
  },
  {
    id: 4,
    title: "Previous Result",
    role: "admin",
    status: "active",
    datatable: <PreviousResult />,
  },
  {
    id: 5,
    title: "School Information",
    role: "admin",
    status: "active",
    datatable: <SchoolInformation />,
  },
  {
    id: 6,
    title: "Update News",
    role: "admin",
    status: "active",
    datatable: <UpdateNews />,
  },
  {
    id: 7,
    title: "Admin Panel",
    role: "admin",
    status: "active",
    datatable: <AdminPanel />,
  }
];

// export const page_navigation = [
//   { name: "/user/news", title: "News", role: ["random",] },
//   {
//     name: "/user/exam_registration",
//     title: "Exam Registration",
//     role: "student",
//   },
//   { name: "/user/school_registration", title: "School Registration", role: "principal" },
//   { name: "/user/result", title: "Result" },
//   { name: "/admin/login", title: "Login" },
// ];

export default allNavigation;