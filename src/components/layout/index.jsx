import { Outlet } from "react-router-dom";
import HomePageHeader from "../header/HomePageHeader";
import HomePageFooter from "../footer/HomePageFooter";

function Layout() {
  return (
    <div>
      <HomePageHeader />
      <Outlet />
      <HomePageFooter />
    </div>
  );
}

export default Layout;
