import React from "react";
import "./FishCard.scss";
import { Image } from "antd";

function FishCard({ koiFish }) {
  console.log("Fish", koiFish);
  return (
    <div className="hp-fishCard-container">
      <div className="hp-fishCard-image">
        <Image width={"100%"} height={"100%"} src={koiFish.image} />
      </div>
      <div className="hp-fishCard-information">
        <span>
          <strong>Breed: </strong> {koiFish.breed.breedName}
        </span>
        <span>
          <strong>Description: </strong> {koiFish.description}
        </span>
      </div>
    </div>
  );
}

export default FishCard;
