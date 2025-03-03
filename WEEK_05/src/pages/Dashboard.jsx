import logo from "../asserts/logo.png";
import profile from "../asserts/profile.png";
import home from "../asserts/home.png";
import addproduct from "../asserts/addproduct.png";
import product from "../asserts/product.png";
import cart from "../asserts/cart.png";
import Image from "../components/Image";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import {
  ADD_PRODUCT_ROUTE,
  CART_ROUTE,
  HOME_ROUTE,
  PRODUCT_ROUTE,
  PROFILE_ROUTE,
} from "../constants/navigationConstants";
import DashboardNav from "../components/DashboardNav";
import { Icons } from "../components/Icons";
import { IconType } from "../enums/appEnum";


export default function Dashboard() {
  const { state } = useContext(CartContext);
  const { setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const count = useMemo(() => {
    return state.cartItems.length;
  }, [state.cartItems]);

  function handleLogout() {
    setIsAuthenticated(false);
    setIsAdmin(false);
  }

  return (
    <>
      <div className="flex w-full bg-cover bg-center h-20 justify-between p-1 font-mono" >
        <div className="flex">
          <Image source={logo} className="h-20 w-40" />
          {isAdmin && (
            <DashboardNav
              title="Add-Product"
              click={() => navigate(ADD_PRODUCT_ROUTE)}
              source={addproduct}
            />
          )}
        </div>
        <div className="flex">
          <DashboardNav
            title="Home"
            click={() => navigate(HOME_ROUTE)}
            source={home}
          />
          <DashboardNav
            title="Products"
            click={() => navigate(PRODUCT_ROUTE)}
            source={product}
          />
        </div>
        <div className="flex">
          <DashboardNav
            title="Profile"
            click={() => navigate(PROFILE_ROUTE)}
            source={profile}
          />
          <DashboardNav
            title={`Cart : ${count}`}
            click={() => navigate(CART_ROUTE)}
            source={cart}
          />
          <div className="cursor-pointer" onClick={handleLogout}>
            <Icons type={IconType.LogoutIcon} />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
