import React from "react";
import "./HomePageAboutUs.scss";
import { Flex } from "antd";

function HomePageAboutUs() {
  return (
    <div className="hp-aboutus-container">
      <div className="hp-aboutus-video">
        <video src="video/koi-video-homepage.mp4" autoPlay loop muted />
      </div>

      <div className="hp-aboutus-detail">
        <div className="hp-aboutus-detail__intro">
          <span>WELCOME TO OUR SITE</span>
          <h3>We are the best company for your visit</h3>
          <p>
            Over the years, we have successfully organized many Koi buying
            tours, earning the trust of Koi enthusiasts nationwide. Our
            customers always praise the personalized experience, professional
            guidance, and seamless process from farm visits to safe
            transportation. By partnering with leading Japanese breeders, we
            ensure that each tour not only helps customers buy Koi directly in
            Japan, but is also a rewarding journey for any Koi enthusiast.
          </p>
        </div>

        <div className="hp-aboutus-detail__experience">
          <Flex vertical>
            <span className="ex-title">20+</span>
            <span className="ex-content">
              <span>Years</span>
              <br />
              <span>Experience</span>
            </span>
          </Flex>

          <Flex vertical>
            <span className="ex-title">100+</span>
            <span className="ex-content">
              <span>Happy</span>
              <br />
              <span>Customers</span>
            </span>
          </Flex>

          <Flex vertical>
            <span className="ex-title">15+</span>
            <span className="ex-content">
              <span>Choices</span>
              <br />
              <span>of Services</span>
            </span>
          </Flex>

          <Flex vertical>
            <span className="ex-title">10+</span>
            <span className="ex-content">
              <span>Professional</span>
              <br />
              <span>Guides</span>
            </span>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default HomePageAboutUs;
