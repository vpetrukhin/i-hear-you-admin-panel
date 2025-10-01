import { LOGIN_PAGE_ROUTE, LoginPage } from "@/pages/LoginPage";
import {
  MATERIAL_LIST_PAGE_ROUTE,
  MaterialListPage,
} from "@/pages/MaterialListPage";
import { MATERIAL_PAGE_ROUTE, MaterialPage } from "@/pages/MaterialPage";
import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={MATERIAL_LIST_PAGE_ROUTE} />,
  },
  {
    path: MATERIAL_LIST_PAGE_ROUTE,
    element: (
      <ProtectedRoute>
        <MaterialListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: MATERIAL_PAGE_ROUTE,
    element: <MaterialPage />,
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: <LoginPage />,
  },
]);
