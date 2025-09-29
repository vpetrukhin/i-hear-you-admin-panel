import { LOGIN_PAGE_ROUTE, LoginPage } from "@/pages/LoginPage";
import {
  MATERIAL_LIST_PAGE_ROUTE,
  MaterialListPage,
} from "@/pages/MaterialListPage";
import { MATERIAL_PAGE_ROUTE, MaterialPage } from "@/pages/MaterialPage";
import { MATERIAL_CREATE_PAGE_ROUTE, MaterialCreatePage } from '@/pages/MaterialCreatePage';
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={MATERIAL_LIST_PAGE_ROUTE} />,
  },
  {
    path: MATERIAL_LIST_PAGE_ROUTE,
    element: <MaterialListPage />,
  },
  {
    path: MATERIAL_CREATE_PAGE_ROUTE,
    element: <MaterialCreatePage />
  },
  {
    path: MATERIAL_PAGE_ROUTE,
    element: <MaterialPage materialListPageRoute={MATERIAL_LIST_PAGE_ROUTE} />,
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: <LoginPage />,
  },
]);
