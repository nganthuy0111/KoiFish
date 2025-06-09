import React, { useEffect, useState } from "react";
import HomePageHeader from "../../components/header/HomePageHeader";
import "./SearchTourResult.scss";
import TourResultTemplate from "./TourResultTemplate";
import { useDispatch, useSelector } from "react-redux";
import { resetTour } from "../../redux/features/tourSlice";

function SearchTourResult() {
  const tourResult = useSelector((store) => store.tour);
  const [tourList, setTourList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tourResult && tourResult.listData && tourResult.listData.length > 0) {
      setTourList(tourResult.listData);
    } else {
      setTourList([]); // Reset tourList if no tours are available
    }
  }, [tourResult]);

  useEffect(() => {
    return () => {
      dispatch(resetTour());
    };
  }, [dispatch]);

  console.log("tourList", tourList);
  return (
    <div>
      <HomePageHeader />
      <div className="tour-result-container">
        <div className="title-result">
          <h3>Search Results</h3>
        </div>

        {tourList && tourList.length > 0 ? (
          tourList.map((tour) => (
            <TourResultTemplate
              key={tour.id}
              tourId={tour.tourId}
              openTourId={tour.id}
              image={tour.image}
              tourName={tour.tourName}
              startDate={tour.startDate}
              time={tour.time}
              duration={tour.duration}
              farms={tour.farmList}
              price={tour.price}
            />
          ))
        ) : (
          <p>No tours available.</p>
        )}
      </div>
    </div>
  );
}

export default SearchTourResult;
