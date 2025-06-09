import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./VirtualSlide.css";
import { Col, Flex, Row } from "antd";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function VirtualSlide({
  title,
  inputSlides,
  slidePerView,
  spaceBetween,
  incrementPage,
  decrementPage,
}) {
  const [swiperRef, setSwiperRef] = useState(null);

  const handlePrevSlide = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
      decrementPage();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef) {
      swiperRef.slideNext();
      incrementPage();
    }
  };

  return (
    <div className="slideConvert-container">
      <Row>
        <Col span={12}>
          <h1>{title}</h1>
        </Col>

        <Col span={12}>
          <Flex style={{ height: "100%" }} align="center" justify="flex-end">
            <div className="left-button slide-button" onClick={handlePrevSlide}>
              <MdKeyboardArrowLeft />
            </div>
            <div
              className="right-button slide-button"
              onClick={handleNextSlide}
            >
              <MdKeyboardArrowRight />
            </div>
          </Flex>
        </Col>
      </Row>
      <Swiper
        modules={[Virtual]}
        onSwiper={setSwiperRef}
        slidesPerView={slidePerView}
        spaceBetween={spaceBetween}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        virtual
      >
        {inputSlides?.map((slideContent, index) => (
          <SwiperSlide
            key={slideContent}
            virtualIndex={index}
            className="style-slide"
          >
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default VirtualSlide;
