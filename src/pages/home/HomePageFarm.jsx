import React, { useEffect, useState } from "react";
import "./HomePageFarm.scss";
import VirtualSlide from "../../components/swiper/VirtualSlide";
import FarmCard from "../../components/homepage-farmCard/FarmCard";
import api from "../../config/axios";
function HomePageFarm() {
  const [farms, setFarms] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const incrementPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const fetchFarms = async () => {
    try {
      const response = await api.get(`farm/guest/get?page=${page}&size=${4}`);

      setTotalPages(response.data.totalPages);
      const getFarms = [];

      response.data.listData.map((farm) => {
        getFarms.push(
          <FarmCard
            id={farm.id}
            image={farm.image}
            name={farm.farmName}
            owner={farm.owner}
            location={farm.location}
            description={farm.description}
          />
        );
      });

      setFarms(getFarms);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, [page]);
  return (
    <div className="homepagefarm-container">
      <VirtualSlide
        title={"Explore our best destinations"}
        inputSlides={farms}
        slidePerView={4}
        spaceBetween={30}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
      />
    </div>
  );
}

export default HomePageFarm;
