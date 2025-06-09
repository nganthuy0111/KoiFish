import { useEffect, useState } from "react";
import { Row, Col, Card, List, Typography, Button, Carousel } from "antd";
import {
  EnvironmentOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./Farm.css";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import VirtualSlide from "../../components/swiper/VirtualSlide";
import FishCard from "../../components/homePage-FishCard/FishCard";

const { Title, Paragraph } = Typography;

function Farm() {
  const { farmId } = useParams();
  const [farmdetail, setFarmDetail] = useState({});
  const [koi, setKoi] = useState([]);

  const fetchFarm = async () => {
    try {
      const response = await api.get(`/farm`, {
        params: { id: farmId },
      });
      setFarmDetail(response.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchFarm();
    fetchKoi();
  }, []);

  const fetchKoi = async () => {
    try {
      const response = await api.get(`koi/list-koi/farm-id?id=${farmId}`);
      console.log(response.data);
      const mapKoi = [];
      response.data.map((koi) => {
        const modifiedKoi = { ...koi, image: koi.images };
        mapKoi.push(<FishCard koiFish={modifiedKoi} />);
      });
      setKoi(mapKoi);
    } catch (err) {
      toast.error(err.response?.data || "Error fetching koi");
      console.error("Error fetching koi:", err);
    }
  };

  return (
    <div className="farm-detail-container">
      <Row gutter={[16, 16]}>
        <Col span={12} xs={24} lg={8} className="image-section">
          <img
            src={farmdetail.image}
            alt="Marusaka Koi Farm"
            className="farm-image"
          />
          <Row gutter={[8, 8]} className="additional-images">
            <Col span={12}>
              <img
                src={farmdetail.image1}
                alt="Additional Image 1"
                className="additional-farm-image"
              />
            </Col>
            <Col span={12}>
              <img
                src={farmdetail.image2}
                alt="Additional Image 1"
                className="additional-farm-image"
              />
            </Col>
          </Row>
        </Col>
        <Col span={12} xs={24} lg={16} className="info-section">
          <Title
            level={2}
            className="farmName"
            style={{
              color: "orange",
            }}
          >
            {farmdetail.farmName}
          </Title>
          <Paragraph>
            Thank you for visiting our Koi fish farm! Your satisfaction and
            enjoyment as you experience our beautiful Koi fish and tranquil
            surroundings are our greatest honor and motivation. We are committed
            to continuously improving our services to meet your expectations and
            create memorable experiences. We look forward to the opportunity to
            welcome you back in the future!
          </Paragraph>
          <List>
            <List.Item>
              <TeamOutlined
                style={{
                  color: "orange",
                }}
              />{" "}
              Owner: {farmdetail.owner}
            </List.Item>
            <List.Item>
              <EnvironmentOutlined
                style={{
                  color: "orange",
                }}
              />{" "}
              Location: {farmdetail.location}
            </List.Item>
          </List>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="details-section">
        <Col span={24}>
          <Card title="Details">
            <Paragraph>{farmdetail.description}</Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Koi Fish Section */}
      <VirtualSlide
        title={"Our Koi Fish Breed"}
        inputSlides={koi}
        slidePerView={4}
        spaceBetween={20}
      />
    </div>
  );
}

export default Farm;
