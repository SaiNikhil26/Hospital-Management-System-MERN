import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import signupimg from "../Images/signup.gif"
import Footer from "../components/Footer";
import logo from "../Images/logo.png"

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
    <header className='header flex items-center'>
        <div className='container'>
            <div className='flex items-center justify-between'>
                {/* -------logo--------- */}
                <div>
                    <img src={logo} alt="" />
                </div>
            </div>
      </div>
    </header>
<section className='px-5 xl:px-0 bg-black'>
            <div className='max-w-[1170px] mx-auto body-page'>
                <div className='grid grid-cols-2 lg:grid-cols-2'>
                    <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
                        <figure className='rounded-l-lg'>
                            <img src={signupimg} alt="" className='w-full rounded-l-lg' />
                        </figure>
                    </div>

                    <div className='rounded-l-lg lg:pl-16 py-10'>
                        <h3 className='text-primaryColor text-[22px] leading-9 font-bold mb-10 create-account'>
                            Create an <span className='text-primaryColor'>account</span></h3>

                            <Form onFinish={onfinishHandler} layout="vertical">
                    <div className='mb-5'>
		<Form.Item name="name">
                        <input type="text" placeholder='Full Name' name='fname'
                        className="pr-4 py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-black
                        placeholder:text-black rounded-md cursor-pointer w-96" required/>
          </Form.Item>
                    </div>
                    <div className='mb-5'>
		<Form.Item name="email">
                        <input type="email" placeholder='Email' name='email'
                        className="w-96 pr-4 py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-black
                        placeholder:text-black rounded-md cursor-pointer" required/>
          </Form.Item>
                    </div>
                    <div className='mb-5'>
          <Form.Item name="password">
                        <input type="password" placeholder='Password' name='password'
                        className="w-96 pr-4 py-3 border-b border-solid border-[#0066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-black
                        placeholder:text-black rounded-md cursor-pointer" required/>
          </Form.Item>
                    </div>

                    <div className="mt-7">
                        <button className="w-96 bg-primaryColor text-white text-[25px] leading-[30px] rounded-lg px-4 py-3" type="submit">Sign Up</button>
                    </div>


                    <p className="mt-5 text-center text-[25px] text-primaryColor">Already have an account?
                    <Link to='/login' className="text-primaryColor font-medium">Login</Link></p>
                            </Form>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  );
};

export default Register;
