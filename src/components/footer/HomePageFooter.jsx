import React from "react";
import "./HomePageFooter.css";
import { Flex, Space } from "antd";
import {
  FaFacebook,
  FaGithub,
  FaGooglePlus,
  FaLocationDot,
} from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function HomePageFooter() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-title">
          <Flex vertical>
            <img
              width={70}
              height={70}
              className="logo-footer"
              src="/image/logo2.png"
            />
            <h3 style={{ color: "#ff8a33" }}>Koi Fish Tour</h3>
          </Flex>
        </div>

        <div className="footer-content">
          <Flex justify="space-between">
            <div>
              <h3>Services</h3>
              <p>Koi Fish Farm Visits</p>
              <p>Guided Tours</p>
              <p>Fish Selection Assistance</p>
              <p>Export and Shipping</p>
            </div>

            <div>
              <h3>Home</h3>
              <p>Home</p>
              <p>About us</p>
              <p>Tour Packages</p>
            </div>

            <div>
              <h3>Help</h3>
              <p>Term of Use</p>
              <p>Provicy Policy</p>
            </div>

            <div>
              <h3>Contacts</h3>
              <div style={{ marginTop: -14 }}>
                <Flex align="center">
                  <Space>
                    <FaLocationDot className="footer-icon" />
                    <p>5 anh em sieu nhan, Student, FPTU</p>
                  </Space>
                </Flex>

                <Flex align="center">
                  <Space>
                    <FaPhoneAlt className="footer-icon" />
                    <p>+84 345678911</p>
                  </Space>
                </Flex>

                <Flex align="center">
                  <Space>
                    <IoMdMail className="footer-icon" />
                    <p>5anhemsieunhan@fpt.edu.vn</p>
                  </Space>
                </Flex>
              </div>
            </div>

            <div>
              <h3>Social Media</h3>
              <Flex justify="space-between">
                <FaFacebook className="footer-icon-contact" />
                <FaGithub className="footer-icon-contact" />
                <FaGooglePlus className="footer-icon-contact" />
              </Flex>
            </div>
          </Flex>
        </div>
      </div>
    </footer>
  );
}

export default HomePageFooter;
