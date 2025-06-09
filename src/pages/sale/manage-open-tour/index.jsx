import { PlusCircleFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  InputNumber,
  message,
  Modal,
  Select,
  Spin,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/file";
import moment from "moment";
import OpenTourTable from "./OpenTourTable";

function ManageOpenTour() {
  const [isOpenTourFormOpen, setIsOpenTourFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [scheduleFile, setScheduleFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState(0);

  const fetchTour = async () => {
    try {
      const response = await api.get("tour/guest/get?page=0&size=50");
      setTours(response.data.listData);
    } catch (error) {
      toast.error("Cannot fetch data of tours!");
    }
  };

  useEffect(() => {
    fetchTour();
  }, []);

  const showOpenTourForm = () => {
    setIsOpenTourFormOpen(true);
  };

  const handleCancelOpenTour = () => {
    setIsOpenTourFormOpen(false);
  };

  const handleTourChange = (value) => {
    setSelectedTour(value);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  // handle schedule
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        message.error("File must be PDF");
        return;
      }

      const maxSize = 10 * 1024 * 1024;

      if (file.size > maxSize) {
        message.error("File must be smaller than 10MB");
        return;
      }

      try {
        setIsUploading(true);
        const fileInFirebase = await uploadFile(file);
        setScheduleFile(fileInFirebase);
        message.success("File uploaded successfully!");
      } catch (error) {
        message.error("Failed to upload file. Please try again.");
      } finally {
        setIsUploading(false);
      }
    } else {
      message.error("File is required");
    }
  };

  const resetForm = () => {
    setSelectedTour(null);
    setSelectedDate(null);
    setPrice(null);
    setScheduleFile(null);
    setIsUploading(false);
  };

  const handleOpenTour = async () => {
    if (!selectedTour) {
      message.error("Please choose a tour!");
      return;
    }
    if (!selectedDate) {
      message.error("Please select a start date!");
      return;
    }
    if (price === null || price === undefined || price === "" || price <= 0) {
      message.error("Please enter a valid price!");
      return;
    }
    if (!scheduleFile) {
      message.error("Please upload a schedule file!");
      return;
    }

    const openTourData = {
      tourId: selectedTour,
      startDate: selectedDate,
      price: price,
      schedule: scheduleFile,
    };

    try {
      setIsSubmitting(true);
      const response = await api.post("open-tour", openTourData);
      message.success("Tour opened successfully!");
      resetForm();
      fetchTour();
      setIsOpenTourFormOpen(false);
    } catch (error) {
      message.error("Failed to open tour. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusCircleFilled />}
        style={{
          backgroundColor: "",
          borderRadius: "50px",
          marginBottom: "20px",
        }}
        onClick={showOpenTourForm}
      >
        Open Tour
      </Button>

      <div>
        <OpenTourTable />
      </div>

      <Modal
        title="Open tour"
        open={isOpenTourFormOpen}
        onOk={handleOpenTour}
        onCancel={handleCancelOpenTour}
        loading={isSubmitting}
      >
        <Flex
          vertical
          style={{
            height: "100%",
          }}
        >
          <Select
            style={{ marginBottom: "20px" }}
            value={selectedTour}
            placeholder="Choose a tour"
            onChange={handleTourChange}
            options={tours.map((tour) => ({
              label: tour.tourName,
              value: tour.id,
            }))}
          />

          <DatePicker
            value={selectedDate ? moment(selectedDate) : null}
            style={{ marginBottom: "20px" }}
            placeholder="Select start date"
            onChange={handleDateChange}
          />

          <InputNumber
            value={price}
            onChange={handlePriceChange}
            style={{ marginBottom: "20px", width: "100%" }}
            placeholder="Price"
          />
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              name="schedule"
              disabled={isUploading}
            />

            {isUploading && (
              <div style={{ marginTop: "10px" }}>
                <Spin /> Uploading file, please wait...
              </div>
            )}
          </div>
        </Flex>
      </Modal>
    </div>
  );
}

export default ManageOpenTour;
