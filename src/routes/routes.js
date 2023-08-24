import { createBrowserRouter, Navigate } from "react-router-dom";

// import ErrorPage from "../pages/error";
import Counter from "../pages/counter";
import Login from "../pages/auth/login";
import TestingPage from "../pages/testing";
import PermittedRoutes from "./permitted_routes";
import QAForm from "../pages/question_and_answers";
import StaffListing from "../pages/listing/staff_list";
import AdminListing from "../pages/listing/admin_list";
import ProtectedRoute from "../routes/protected_route";
// import UsersList from "../pages/admin_users/users_list";
import CreateUser from "../pages/admin_users/create_user";
import BusinessList from "../pages/listing/business_list";
import ForgetPassword from "../pages/auth/forget_password";
import CreatePassword from "../pages/auth/create_password";
import PlexarUsersList from "../pages/listing/plexar_users_list";
import SubscriptionsList from "../pages/subscription/subscriptions_list";
import CreateSubscription from "../pages/subscription/create_subscription";
import AddPermissions from "../pages/admin_users/assign_permission_to_user";
// import StaffListTable from "../components/pages/lisiting/staff_list_table";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <Login />,
    // errorElement: <ErrorPage />
  },
  {
    path: "/forget_password",
    element: <ForgetPassword />,
  },
  {
    path: "/create_password",
    element: <CreatePassword />,
  },
  {
    path: "/counter_test",
    // element: <Counter />
    element: (
      <ProtectedRoute>
        <Counter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create_user",
    element: (
      <ProtectedRoute>
        <PermittedRoutes moduleKey="adminUsers" requiredPermission="isAdd">
          <CreateUser />
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users_list",
    element: (
      <ProtectedRoute>
        <PermittedRoutes moduleKey="adminUsers" requiredPermission="isView">
          <AdminListing />
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/subscriptions_list",
    element: (
      <ProtectedRoute>
        {" "}
        <PermittedRoutes moduleKey="subscriptions" requiredPermission="isView">
          <SubscriptionsList />{" "}
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create_subscription_plan",
    element: (
      <ProtectedRoute>
        {" "}
        <PermittedRoutes moduleKey="subscriptions" requiredPermission="isAdd">
          <CreateSubscription />{" "}
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/add_permission",
    element: (
      <ProtectedRoute>
        {" "}
        <PermittedRoutes moduleKey="adminUsers" requiredPermission="isAdd">
          <AddPermissions />{" "}
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/question_answer_form",
    element: (
      <ProtectedRoute>
        {" "}
        {/* <PermittedRoutes moduleKey="qaForms" requiredPermission="isView"> */}
          <QAForm />{" "}
        {/* </PermittedRoutes> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff_listing",
    element: (
      <ProtectedRoute>
        <StaffListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/business_list",
    element: (
      <ProtectedRoute>
        {" "}
        <PermittedRoutes moduleKey="businessList" requiredPermission="isView">
          <BusinessList />{" "}
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/plexar_users_list",
    element: (
      <ProtectedRoute>
        {" "}
        <PermittedRoutes moduleKey="plexarUsers" requiredPermission="isView">
          <PlexarUsersList />{" "}
        </PermittedRoutes>
      </ProtectedRoute>
    ),
  },
  {
    path: "/testing",
    element: <TestingPage />,
  },
]);
