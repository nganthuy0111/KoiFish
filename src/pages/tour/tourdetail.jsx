import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Row,
  Col,
  Typography,
  List,
  Result,
} from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import "./TourDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";
import { CgSandClock } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { PiFarm } from "react-icons/pi";
import VirtualSlide from "../../components/swiper/VirtualSlide";
import { toast } from "react-toastify";
import FeedbackCard from "../../components/feedback/FeedbackCard";
import { useDispatch } from "react-redux";
import { saveTour } from "../../redux/features/tourSlice";
import FarmCard from "../../components/homepage-farmCard/FarmCard";
import FishCard from "../../components/homePage-FishCard/FishCard";

const { Title, Paragraph } = Typography;

function TourDetail() {
  const { tourId } = useParams();
  const [originTourId, setOriginTourId] = useState("");
  const [tourdetail, setTourDetail] = useState({});
  const [farmList, setFarmList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchTour = async () => {
    try {
      const response = await api.get(`open-tour/${tourId}`);

      console.log("Tour Detail", response.data);
      setTourDetail(response.data);
      setOriginTourId(response.data.tourId);
      dispatch(saveTour(response.data));
      const getFarms = [];

      response.data.farmList.map((farm) => {
        getFarms.push(
          <FarmCard
            id={farm.id}
            image={farm.image}
            name={farm.farmName}
            owner={farm.owner}
            location={farm.location}
            description={farm.description}
          />
        );
      });

      setFarmList(getFarms);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchTour();
  }, [tourId]);

  useEffect(() => {
    if (originTourId) {
      fetchFishFromFarm();
    }
  }, [originTourId]);

  //Koi Fish items
  const [fishFromFarm, setFishFromFarm] = useState([]);

  const fetchFishFromFarm = async () => {
    try {
      const response = await api.get(
        `koi/list-koi/tour-id?tourId=${originTourId}`
      );
      const mapKoiList = [];

      response.data.map((koi) => {
        mapKoiList.push(
          <FishCard key={koi.id} koiFish={{ ...koi, image: koi.images }} />
        );
      });

      setFishFromFarm(mapKoiList);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleBookNow = () => {
    navigate(`/tourbooking/${tourId}`);
  };

  const formatNumber = (value) => {
    if (typeof value !== "number") return value;
    return `${value.toLocaleString("en-US")} VND`;
  };

  return (
    <div className="tour-detail-container">
      {tourdetail ? (
        <div>
          <Row gutter={[16]}>
            <Col xs={24} lg={8} className="image-section">
              <img
                src={tourdetail.image}
                alt="Wine Tasting In Tuscany"
                className="main-image"
              />
            </Col>

            {/* Tour Information Section */}
            <Col xs={24} lg={16} className="info-section">
              <Title level={2}>{tourdetail.tourName}</Title>
              <Paragraph>
                From:{" "}
                <span className="price">{formatNumber(tourdetail.price)}</span>
              </Paragraph>
              <List>
                <List.Item>
                  <CiCalendar className="detail-icon" />{" "}
                  <strong>Start Date:</strong> {tourdetail.startDate}
                </List.Item>
                <List.Item>
                  <CgSandClock className="detail-icon" />{" "}
                  <strong>Duration:</strong> {tourdetail.duration}
                </List.Item>
                <List.Item>
                  <ClockCircleOutlined className="detail-icon" />{" "}
                  <strong>Time:</strong> {tourdetail.time}
                </List.Item>
                <List.Item>
                  <PiFarm className="detail-icon" /> <strong>Farms:</strong>{" "}
                  {Array.isArray(tourdetail.farmList) &&
                  tourdetail.farmList.length > 0 ? (
                    tourdetail.farmList.map((farm) => (
                      <span>{farm.farmName}, </span>
                    ))
                  ) : (
                    <p>No farms available for this tour.</p> // Message when no farms are available
                  )}
                </List.Item>
                <List.Item>
                  <EnvironmentOutlined className="detail-icon" />{" "}
                  <strong>Departure:</strong> From Tan Son Nhat HCM City
                </List.Item>{" "}
                <List.Item>
                  <UserOutlined className="detail-icon" />{" "}
                  <strong>Guide service:</strong> Included
                </List.Item>
                <List.Item>
                  <TranslationOutlined className="detail-icon" />{" "}
                  <strong>Language:</strong> English, Vietnamese
                </List.Item>
              </List>

              <Button onClick={handleBookNow} type="text" className="book-now">
                Book Now
              </Button>
            </Col>
          </Row>

          {/* Details Section */}
          <Row gutter={[16, 16]} className="details-section">
            <Col span={24}>
              <Card title="Details">
                <Paragraph>{tourdetail.description}</Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Farms of tour */}

          <VirtualSlide
            title="Destinations"
            inputSlides={farmList}
            slidePerView={3}
            spaceBetween={10}
          />

          {/* Koi Fish of farms */}
          <VirtualSlide
            title="Speacial Koi Fish"
            inputSlides={fishFromFarm}
            slidePerView={4}
            spaceBetween={10}
          />
        </div>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary">Back Home</Button>}
        />
      )}
    </div>
  );
}

export default TourDetail;
