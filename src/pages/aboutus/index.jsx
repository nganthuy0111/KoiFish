import { Link } from "react-router-dom";
import "./index.css";
import { Col, Row } from "antd";
import { useEffect } from "react";
function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container aboutus">
        <div className="title">
          <p className="title__topic">Discover Japan’s Finest Koi</p>
          <p className="title__content">
            Welcome to our Koi Buying Tour service in Japan, where we offer a
            unique and authentic experience for Koi enthusiasts. We organize
            professional tours to renowned Koi farms across Japan, giving you
            the opportunity to personally select and purchase high-quality Koi
            fish directly from top breeders. With our deep knowledge of these
            iconic fish, we are committed to delivering an unforgettable journey
            and supporting you every step of the way, from selection to safe
            transportation of your Koi back to your home country.
          </p>
          <Link to="/tourpackage" className="btn__tour">
            View our tour packages
          </Link>

          {/* <div className="btn__tour">View our tour packages</div> */}
        </div>
      </div>
      <div className="service">
        <Row>
          <Col span={12}>
            <div className="service__left">
              <img
                src="https://jgarden.vn/wp-content/uploads/2022/05/093cb749bebfed46069724a890b9867f-720x900.jpg"
                alt=""
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="service__right">
              <p className="service__content">WELCOME TO OUR SITE!</p>
              <h1>We Are The Koi Fish Tour 99 To Offer You The Best</h1>
              <p>
                Over the years, we have successfully organized many Koi buying
                tours, earning the trust of Koi enthusiasts nationwide. Our
                customers always praise the personalized experience,
                professional guidance, and seamless process from farm visits to
                safe transportation. By partnering with leading Japanese
                breeders, we ensure that each tour not only helps customers buy
                Koi directly in Japan, but is also a rewarding journey for any
                Koi enthusiast.
              </p>
              <div className="items">
                <div className="item__one">
                  <h1>20+</h1>
                  <p>Year Experience</p>
                </div>
                <div className="item__two">
                  {/* <h1>100+</h1> */}
                  <h1>100+</h1>
                  <p>Happy Customer</p>
                </div>
                <div className="item__two">
                  <h1>15+</h1>
                  <p>Choice of Services</p>
                </div>
                <div className="item__two">
                  <h1>10+</h1>
                  <p>Professional Guides</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AboutUs;
