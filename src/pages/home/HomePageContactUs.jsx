import React from "react";
import "./HomePageContactUs.scss";
import { Button, Flex, Image } from "antd";

function HomePageContactUs() {
  return (
    <div className="hp-contactus-container">
      <div className="hp-contactus-intro">
        <h3>Get Special Offers for Organizations</h3>
        <p>
          Enjoy exclusive group packages to Japan's top fish farms. Perfect for
          businesses and aquariums, with discounts, VIP access, and
          expert-guided tours for a seamless buying experience!
        </p>

        <Button style={{ backgroundColor: "#ff8a33", color: "white" }}>
          Contact us
        </Button>
      </div>

      <div className="hp-contactus-image">
        <Image
          width={"50%"}
          height={"100%"}
          preview={false}
          src="image/homePage-contact-image.png"
        />
      </div>
    </div>
  );
}

export default HomePageContactUs;
