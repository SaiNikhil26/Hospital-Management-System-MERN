import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table, Button } from "antd";
import '../../styles/Doctor.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // getDoctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  // handle block
const handleDeleteDoctor = async (record) => {
  try {
    const res = await axios.post(
      "/api/v1/admin/deleteDoctor",{doctorId:record._id},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      message.success(res.data.message);
      window.location.reload();
    }
  } catch (error) {
    message.error("Something Went Wrong");
  }
};


  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <>
              <Button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </Button>
              <Button
                className="btn btn-danger ms-2"
                onClick={() => handleAccountStatus(record, "reject")}
              >
                Reject
              </Button>
              </>
          )}
          {record.status === "approved" &&(
            <>
              <Button
                className="btn btn-danger"
                onClick={() => handleDeleteDoctor(record)}
              >
                Block
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
