import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
// import Footer from '../components/Footer.js';
import Footer from '../components/Footer.js';
import "../styles/HomePage.css";
import heroImg01 from "../Images/hero-img01.png" 
import  heroImg02 from "../Images/hero-img02.png" 
import  heroImg03 from "../Images/hero-img03.png" 
import DoctorList from "../components/DoctorList";
import About from "../components/About.js"
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getUserData();

    // Use Intersection Observer for fade-in effect on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 1.0 } // Adjust the threshold based on your preference
    );

    // Add each animated paragraph to the observer
    const animatedParagraphs = document.querySelectorAll(".animated-paragraph");
    animatedParagraphs.forEach((paragraph) => {
      observer.observe(paragraph);
    });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getUserData();
  // }, []);
  return (
   <>
    <Layout>
      {/* <h1 className="text-center">Home Page</h1> */}

      <section className='hero_section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
            <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>

                {/* ========== hero content ======== */}
                <div>
                    <div className='lg:w-[570px]'>
                        <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px]
                        md:leading-[70px]'>We help patients live a healthy, longer life</h1>
                        <p className='text_para'>At Medicare, we revolutionize healthcare administration with a cutting-edge and user-friendly platform designed to enhance efficiency, streamline operations, and prioritize patient care. Our comprehensive hospital management system is more than just software; it's a commitment to transforming healthcare management for the better.
                        </p>

                        {/* <button className='btn'>Request an Appointment</button> */}
                    </div>
                    {/* ======== hero counter======== */}
                    <div className='mt-[30px] lg:mt[70px] flex flex-col lg:flex-row lg:items-center gap-5
                    lg:gap-[30px]'>
                        <div>
                            <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                            text-headingColor'>30+</h2>
                            <span className='w-[100px] h-2 bg-yellowcolor rounded-full block mt-[-14px]'></span>
                            <p className='text_para'>Years of experience</p>
                        </div>
                        <div>
                            <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                            text-headingColor'>15+</h2>
                            <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                            <p className='text_para'>Clinic Location</p>
                        </div>
                        <div>
                            <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                            text-headingColor'>100%</h2>
                            <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                            <p className='text_para'>Patient Satisfaction</p>
                        </div>
                    </div>
                </div>
                {/* ========== hero content ======== */}
                <div className='flex gap-[30px] justify-end'>
                    <div>
                        <img className='w-full'src={heroImg01} alt="" />
                    </div>
                    <div className='mt-[30px]'>
                        <img src={heroImg02} className='w-full mb-[30px]' alt="" />
                        <img src={heroImg03} className='w-full' alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>
      
        
    <About/>

    <section className="doctor-section2">
        <div className='container'>
            <div className='xl:w-[470px] mx-auto'>
                <h2 className='heading text-center'>Our Doctors</h2>
                <p className='text_para text-center animated-paragraph'>
                    World-class care for everyone. Our health System offers unmatched,
                    expert health care.
                </p>
                <p className="text_para text-center animated-paragraph">
                Beyond their medical expertise, our doctors are known for their compassionate and patient-centered approach. They understand the importance of building strong doctor-patient relationships and take the time to listen to your concerns, answer your questions, and involve you in decisions about your healthcare.
                </p>
                <p className="text_para text-center animated-paragraph">
                To support our doctors in delivering top-notch care, we have equipped our hospital with state-of-the-art facilities and cutting-edge technology. This allows our medical team to diagnose and treat a wide range of medical conditions with precision and efficiency.
                </p>
                <p className="text_para text-center animated-paragraph">
                Your health and well-being are our top priorities. Our team of dedicated doctors is here to provide personalized, comprehensive, and compassionate care for you and your loved ones. Trust us to be your partner in health.
                </p>
            </div>
{/* 
            <DoctorList/> */}
        </div>
      </section>

      <section className="doctor-section">
        <Row>
          {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
        </Row>
      </section>

      <Footer/>
    </Layout>
     {/* <Footer/> */}
   </>
  );
};

export default HomePage;
