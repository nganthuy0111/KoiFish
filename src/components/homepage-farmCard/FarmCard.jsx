import React from "react";
import "./FarmCard.scss";
import { Button, Flex, Image } from "antd";
import { GiFarmer } from "react-icons/gi";
import { MdArrowForward, MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function FarmCard({ id, image, name, owner, location, description }) {
  const navigate = useNavigate();
  return (
    <div className="farm-card-container">
      <div className="farm-card-image">
        <Image
          width={"100%"}
          height={"100%"}
          className="farm-image"
          src={image}
        />
      </div>

      <div className="farm-card-content">
        <h3>{name}</h3>
        <Flex
          style={{
            width: "100%",
            fontSize: 14,
            flexWrap: "wrap", // Allow wrapping for overflow content
          }}
          align="start"
        >
          <Flex style={{ marginBottom: 5, marginRight: 10 }} wrap="wrap">
            <span style={{ marginRight: 2 }}>
              <GiFarmer className="farm-card-icon" />
            </span>
            <span>{owner}</span>
          </Flex>
          <Flex align="center" wrap="wrap">
            <span style={{ marginRight: 2 }}>
              <MdLocationOn className="farm-card-icon" />
            </span>
            <span>{location}</span>
          </Flex>
        </Flex>

        <div className="farm-card-desciption">
          <span>{description}</span>
        </div>
      </div>

      <Flex justify="start" style={{ padding: "0 10px" }}>
        <Button
          onClick={() => navigate(`/farmDetail/${id}`)}
          type="link"
          className="read-more-button"
        >
          <Flex align="center">
            Read More <MdArrowForward style={{ marginLeft: 5 }} />
          </Flex>
        </Button>
      </Flex>
    </div>
  );
}

export default FarmCard;
