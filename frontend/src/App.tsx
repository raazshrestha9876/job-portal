import LoginPage from "./pages/auth/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RecruiterLayout from "./pages/recruiter/Layout";
import SeekerLayout from "./pages/seeker/SeekerLayout";
import RecruiterDashboard from "./pages/recruiter/dashboard/DashboardPage";
import AddCompanyPage from "./pages/recruiter/company/AddCompanyPage";
import ViewCompanyPage from "./pages/recruiter/company/ViewCompanyPage";
import ViewCompanyDetailsPage from "./pages/recruiter/company/ViewCompanyDetailsPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "recruiter",
        element: <RecruiterLayout />,
        children: [
          {
            index: true,
            element: <RecruiterDashboard />,
          },
          {
            path: "company/add",
            element: <AddCompanyPage />,
          },
          {
            path: "company",
            element: <ViewCompanyPage />,
          },
          {
            path: "company/:id",
            element: <ViewCompanyDetailsPage />,
          },
        ],
      },
      {
        path: "seeker",
        element: <SeekerLayout />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
