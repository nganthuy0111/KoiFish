import React, { useEffect, useState } from "react";
import VirtualSlide from "../swiper/VirtualSlide";
import FeedbackCard from "./FeedbackCard";
import "./FeedbackSlide.scss";
import api from "../../config/axios";
function FeedbackSlide() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {
    const page = 0;
    const size = 10;

    try {
      const response = await api.get(
        `feedback/guest/get?page=${page}&size=${size}`
      );
      const getFeedbacks = [];

      response.data.listData.map((feedback) =>
        getFeedbacks.push(
          <FeedbackCard
            star={feedback.rating}
            comment={feedback.comment}
            image={feedback.image}
            name={feedback.nameCustomer}
          />
        )
      );

      setFeedbacks(getFeedbacks);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="feedback-slide-container">
      <VirtualSlide
        title={"Happy Customer Says"}
        inputSlides={feedbacks}
        slidePerView={2}
        spaceBetween={30}
      />
    </div>
  );
}

export default FeedbackSlide;
