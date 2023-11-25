import React from "react";
import "../styles/LoginStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import logo from "../Images/logo.png"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <>
    <header className='header flex items-center'>
        <div className='container '>
            <div className='flex items-center justify-between '>
                {/* -------logo--------- */}
                <div>
                    <img src={logo} alt="" />
                </div>
            </div>
      </div>
    </header>
   <section className='px-5 lg:px-0  bg-black'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 body-page'>
                <h3 className='text-primaryColor text-[22px] leading-9 font-bold mb-10 welcome-back2'>
                    Hello! <span className='text-primaryColor'>Welcome</span> Back
                </h3>
                <Form className='py-4 md:py-0' layout="vertical" onFinish={onfinishHandler}>
                    <div className='mb-5'>
        		<Form.Item name="email">
                        <input type="email" placeholder='Enter Your email' name='email'
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                        placeholder:text-black rounded-md cursor-pointer" required/>
        	</Form.Item>
                    </div>
                    <div className='mb-5'>
        		<Form.Item name="password">
                        <input type="password" placeholder='Password' name='password'
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                        placeholder:text-black rounded-md cursor-pointer" required/>
        	</Form.Item>
                    </div>

                    <div className="mt-7">
                        <button className="w-full bg-primaryColor text-white text-[25px] leading-[30px] rounded-lg px-4 py-3" type="submit">Login</button>
                    </div>


                    <p className="mt-5 text-primaryColor text-center text-[20px]">Don&apos;t have an account?
                    <Link to='/register' className="text-primaryColor font-medium text-[20px]">Register</Link>
                    </p>
                </Form>
            </div>
        </section>
  
  <Footer/>
  </>
  );
};

export default Login;
