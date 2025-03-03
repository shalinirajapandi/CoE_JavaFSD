import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/cart";
import ProductPage from "../pages/ProductPage";
import OfferPage from "../pages/OfferPage";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/AddProduct";
import AdminRoutes from "./AdminRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import CategoryNavigator from "../pages/CategoryNavigator";
import {
  ADD_PRODUCT_ROUTE,
  CART_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  PROFILE_ROUTE,
  ROOT_ROUTE,
} from "../constants/navigationConstants";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROOT_ROUTE} element={<AppLayout />}>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route index element={<Navigate to={LOGIN_ROUTE} replace />} />
        <Route element={<PrivateRoute />}>
          <Route path={HOME_ROUTE} element={<Home />}>
            <Route path={CART_ROUTE} element={<Cart />} />
            <Route path={PROFILE_ROUTE} element={<Profile />} />
            <Route path={PRODUCT_ROUTE} element={<ProductPage />} />
            <Route element={<AdminRoutes />}>
              <Route path={ADD_PRODUCT_ROUTE} element={<AddProduct />} />
            </Route>
            <Route index element={<OfferPage />} />
            <Route element={<CategoryNavigator />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
