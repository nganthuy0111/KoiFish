// TermsAndPrivacy.js
import React, { useEffect, useState } from "react";
import { Form, Button, Divider, Row, Col, Typography, Checkbox, Tabs } from "antd";
import { FileSearchOutlined, LockOutlined } from "@ant-design/icons";
import "./termsprivacy.css";

const TermsAndPrivacy = () => {
  const [activeTab, setActiveTab] = useState("terms");
  
  const onFinish = (type) => {
    console.log(`${type} accepted.`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-privacy-container">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={[
          {
            key: "terms",
            label: "Terms of Service",
            children: (
              <div className="terms-content">
                <h1 className="terms-main-title">Terms of Service</h1>
                <Typography.Paragraph style={{ fontSize: "1.2em", color: "#2f4f4f" }}>
                  Welcome to Koi Fish Tour 99. Please read these terms carefully before
                  using our services.
                </Typography.Paragraph>

                <Divider className="terms-divider" />

                <Form layout="vertical" onFinish={() => onFinish("Terms of Service")} className="terms-form">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Typography.Title level={4}>
                        1. Acceptance of Terms
                      </Typography.Title>
                      <Typography.Paragraph>
                        By accessing and using our website, you agree to be bound by
                        these Terms of Service.
                      </Typography.Paragraph>

                      <Typography.Title level={4}>
                        2. Account Registration
                      </Typography.Title>
                      <Typography.Paragraph>
                        To use certain features, you may need to create an account. You
                        agree to provide accurate information and keep it updated.
                      </Typography.Paragraph>

                      <Typography.Title level={4}>
                        3. Product Information and Pricing
                      </Typography.Title>
                      <Typography.Paragraph>
                        All prices, descriptions, and availability are subject to
                        change. Errors may occur, and we reserve the right to cancel
                        orders affected by these errors.
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                </Form>
              </div>
            ),
          },
          {
            key: "privacy",
            label: "Privacy Policy",
            children: (
              <div className="privacy-content">
                <h1 className="privacy-main-title">Privacy Policy</h1>
                <Typography.Paragraph style={{ fontSize: "1.2em", color: "#2f4f4f" }}>
                  Your privacy is important to us. This policy outlines how we handle
                  your personal information.
                </Typography.Paragraph>

                <Divider className="privacy-divider" />

                <Form layout="vertical" onFinish={() => onFinish("Privacy Policy")} className="privacy-form">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Typography.Title level={4}>
                        1. Information We Collect
                      </Typography.Title>
                      <Typography.Paragraph>
                        We collect personal information you provide, such as your name,
                        email, and address. We also collect usage data and cookies.
                      </Typography.Paragraph>

                      <Typography.Title level={4}>
                        2. How We Use Your Information
                      </Typography.Title>
                      <Typography.Paragraph>
                        We use your information to process transactions and improve user
                        experience.
                      </Typography.Paragraph>

                      <Typography.Title level={4}>
                        3. Sharing Your Information
                      </Typography.Title>
                      <Typography.Paragraph>
                        We only share your information with trusted third parties who
                        assist us in operating our site and are bound by confidentiality
                        agreements.
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                </Form>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default TermsAndPrivacy;
