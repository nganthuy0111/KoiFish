import { useEffect, useState } from "react";
import "./HomePageSearch.css";
import "../../components/footer/template.css";
import { DatePicker, Flex, Select, Slider } from "antd";
import { MdOutlinePublic } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { PiFarm } from "react-icons/pi";
import { CgSandClock } from "react-icons/cg";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTour } from "../../redux/features/tourSlice";

function HomePageSearch() {
  const [farmList, setFarmList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFarm, setSelectedFarm] = useState("");
  const [selectedMin, setSelectedMin] = useState(0);
  const [selectedMax, setSelectedMax] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleOpenSearchFunction();
    fetchFarm();
  }, []);

  //Handle search form
  const [isActivatedSearchButton, setIsActivatedSearchButton] = useState();
  const handleOpenSearchFunction = () => {
    setIsActivatedSearchButton(true);
  };
  const handleCloseSearchFunction = () => {
    setIsActivatedSearchButton(false);
  };

  const fetchFarm = async () => {
    const page = 0;
    const size = 10;
    try {
      const response = await api.get("farm/guest/get", {
        params: { page, size },
      });
      const formattedData = response.data.listData.map((farm) => ({
        value: farm.farmName,
        label: farm.farmName,
      }));

      setFarmList(formattedData);
    } catch (error) {
      toast.error("Cannot get available farms!");
    }
  };

  //handle search data
  const handleChangeDate = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const formatNumber = (value) => {
    if (typeof value !== "number") return value;
    return `${value.toLocaleString("en-US")} VND`;
  };
  const handleChangeBudget = (value) => {
    setSelectedMin(value[0]);
    setSelectedMax(value[1]);
  };

  const handleChangeFarm = (value) => {
    setSelectedFarm(value);
  };

  const handleSearchTour = async () => {
    const page = 0;
    const size = 10;

    const params = {};

    if (selectedDate) params.startDate = selectedDate;
    if (selectedMin) params.min = selectedMin;
    if (selectedMax) params.max = selectedMax;
    if (selectedFarm) params.farm = selectedFarm;

    params.page = page;
    params.size = size;

    try {
      const response = await api.get("tour/search/first", {
        params: params,
      });

      dispatch(saveTour(response.data));
      navigate("search-tour");

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="homePage-container">
        <div className="homePage-title">
          <div className="homePage-title__content">
            <div className="welcome-container">
              <p className="welcome-container__title">Enjoy in the best way!</p>
              <p className="welcome-container__content">
                Find, book and buy Koi Fish easily
              </p>
            </div>

            <div className="search-form">
              <Flex>
                <div
                  className="search-form__function publicTour-button"
                  id="publicTour-button"
                  onClick={handleOpenSearchFunction}
                  style={{
                    color: isActivatedSearchButton ? "#ff8a33" : "white",
                    backgroundColor: isActivatedSearchButton
                      ? "white"
                      : "rgb(153, 153, 153)",
                  }}
                >
                  <Flex align="center">
                    <MdOutlinePublic style={{ marginRight: 5 }} />
                    <p>Public Tours</p>
                  </Flex>
                </div>

                <div
                  className="search-form__function customTour-button"
                  id="customTour-button"
                  onClick={handleCloseSearchFunction}
                  style={{
                    color: isActivatedSearchButton ? "white" : "#ff8a33",
                    backgroundColor: isActivatedSearchButton
                      ? "rgb(153, 153, 153)"
                      : "white",
                  }}
                >
                  <Flex align="center">
                    <HiOutlineUserGroup style={{ marginRight: 5 }} />
                    <p>Custom Tours</p>
                  </Flex>
                </div>
              </Flex>

              <div className="information-picker">
                {/* Public Tours Function Data */}

                <div
                  className="publicTour-form"
                  style={{ display: isActivatedSearchButton ? "flex" : "none" }}
                >
                  <div className="information-picker__element">
                    <Flex align="center">
                      <FaRegCalendarAlt style={{ marginRight: 5 }} />
                      <p>Start Date</p>
                    </Flex>
                    <DatePicker
                      onChange={handleChangeDate}
                      className="custom-picker"
                      suffixIcon={<RiArrowDropDownLine />}
                    />
                  </div>

                  <div className="information-picker__element">
                    <Flex align="center">
                      <PiFarm style={{ marginRight: 5 }} />
                      <p>Farm</p>
                    </Flex>
                    <div>
                      <Select
                        showSearch
                        placeholder="Select a farm"
                        optionFilterProp="label"
                        style={{ border: "none" }}
                        className="custom-select"
                        options={farmList}
                        onChange={handleChangeFarm}
                      />
                    </div>
                  </div>

                  <div className="information-picker__element">
                    <Flex align="center">
                      <CgSandClock style={{ marginRight: 5 }} />
                      <p>Budget</p>
                    </Flex>

                    <div className="duration-dropdown">
                      <Slider
                        onChange={handleChangeBudget}
                        range
                        min={5000000}
                        max={20000000}
                        tooltip={{
                          formatter: (value) => formatNumber(value), // For user view only
                        }}
                      />
                    </div>
                  </div>
                  <Flex align="center">
                    <div onClick={handleSearchTour} className="search-icon">
                      <CiSearch />
                    </div>
                  </Flex>
                </div>

                {/* Custom tour function data */}
                <div
                  className="customTour-form"
                  style={{ display: isActivatedSearchButton ? "none" : "flex" }}
                >
                  <Flex vertical style={{ width: "100%" }}>
                    <h1>Create Your Dream Tour</h1>
                    <span>
                      Customize your ideal travel experience with our Dream Tour
                      feature
                    </span>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/customtour")}
                      style={{ marginTop: "10px" }}
                    >
                      Start Customizing
                    </button>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageSearch;
