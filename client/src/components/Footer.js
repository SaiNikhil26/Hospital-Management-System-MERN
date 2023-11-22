import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png'
import {RiLinkedinFill} from 'react-icons/ri'
import {AiFillGithub,AiOutlineInstagram } from 'react-icons/ai';

const socialLinks=[
    {
        path:"https://www.linkedin.com/in/sainikhil26/",
        icon:<RiLinkedinFill className='group-hover:text-black w-4 h-5'/>,
    },
    {
        path:"https://github.com/SaiNikhil26",
        icon:<AiFillGithub className='group-hover:text-black w-4 h-5'/>,
    },
    {
        path:"https://www.instagram.com/_nikhil.2644_/",
        icon:<AiOutlineInstagram className='group-hover:text-black w-4 h-5'/>,
    },   
];



const Footer = () => {

    const year = new Date().getFullYear()
    return <footer className='pb-16 pt-10 bg-slate-100'>
        <div className='container'>
            <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
                <div>
                    <img src={logo} alt="" />
                    <p className='text-[16px] leading-7 font-[400] text-black mt-4'>Copyright © {year} Developed by Sai Nikhil all rights reserved.</p>
                    <div className='flex items-center gap-3 mt-4'>
                        {socialLinks.map((link,index)=><Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181A1E]
                        rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>{link.icon}</Link>)}
                    </div>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer