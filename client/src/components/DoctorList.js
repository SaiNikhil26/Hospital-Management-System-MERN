import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/DoctorCard.css';
import doctorImage from '../Images/doctor-img03.png'

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card" style={{ width: "15rem"}}>
        <img className="card-img-top" src={doctorImage} alt="Card image cap" />
        <div className="card-body">
          <div className="card-header">
            <h5 className="card-title">Dr. {doctor.firstName} {doctor.lastName}</h5>
          </div>
        </div>
        <div className="card-body">
        <span className='bg-[#CCF0F3] text-irisBlueColor  mt-2 px-2 lg:py-2 lg:px-6 
            text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>{doctor.specialization}</span>
          <p className="card-text">
            <b>Experience</b> {doctor.experience} years
          </p>
          <p className="card-text">
            <b>Fees </b> {doctor.feesPerCunsaltation} INR
          </p>
          <p className="card-text">
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
        <div className="card-footer">
          <button className="btn" style={{ cursor: "pointer" }} onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>Book Appointment</button>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
