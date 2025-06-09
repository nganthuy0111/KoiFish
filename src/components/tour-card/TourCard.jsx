import { Button, Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import "./TourCard.scss";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function TourCard({ tourId, image, title, description }) {
  const navigate = useNavigate();
  return (
    <div className="image-card-container">
      <Card
        hoverable
        className="image-card"
        cover={
          <div className="image-wrapper">
            <img alt={title} src={image} className="card-image" />
          </div>
        }
      >
        <Meta
          title={<h3 className="card-title">{title}</h3>}
          description={<p className="card-description">{description}</p>}
        />

        <Button
          onClick={() => navigate(`/tourdetail/${tourId}`)}
          type="link"
          className="tc-read-more-button "
        >
          <Flex align="center">
            Read More <MdArrowForward style={{ marginLeft: 5 }} />
          </Flex>
        </Button>
      </Card>
    </div>
  );
}

export default TourCard;
