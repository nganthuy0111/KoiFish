import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePageSearch from "./HomePageSearch";
import HomePageFarm from "./HomePageFarm";
import HomePageAboutUs from "./HomePageAboutUs";
import HomePageContactUs from "./HomePageContactUs";
import FeedbackSlide from "../../components/feedback/FeedbackSlide";

function HomePage() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "MANAGER") {
      navigate("/dashboardManager", { replace: true });
    } else if (user?.role === "CONSULTING") {
      navigate("/consulting", { replace: true });
    } else if (user?.role === "SALE") {
      navigate("/dashboardSale", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HomePageSearch />
      <HomePageFarm />
      <HomePageAboutUs />
      <HomePageContactUs />
      <FeedbackSlide />
    </>
  );
}

export default HomePage;
