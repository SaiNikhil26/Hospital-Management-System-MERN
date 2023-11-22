import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import About from '../components/About.js'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import Nav from 'react-bootstrap/Nav';
import logo from '../Images/medicare.jpg'
import Footer from '../components/Footer.js';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      // icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;

      
  return (
    <>
    <header>
      <section className="nav-header">
        <img src={logo}></img>
        <Nav
          activeKey={location.pathname}
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >

          {SidebarMenu.map((menu) => (
            <Nav.Item key={menu.path}>
              <Nav.Link as={Link} to={menu.path}>
                {menu.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="right-items">
          <Nav.Item onClick={handleLogout}>
            <Nav.Link as={Link} to="/login">
              <button type="button" class="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex 
                        items-center justify-center rounded-[50px]">Logout</button>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Badge className="bell-icon"
              count={user && user.notifcation.length}
              onClick={() => {
                navigate("/notification");
              }}
            >
              <i className="fa-solid fa-bell"></i>
            </Badge>
          </Nav.Item>
          <Nav.Item>
           

            <Link className="username" to="/profile">{user?.name}</Link>

          </Nav.Item>

        </div>
      </section>
</header>

    
      <div className="body">{children}</div>
     
      {/* <section>
        <div className='container'>
            <div className='xl:w-[470px] mx-auto'>
                <h2 className='heading text-center'>Our Doctors</h2>
                <p className='text_para text-center'>
                    World-class care for everyone. Our health System offers unmatched,
                    expert health care.
                </p>
            </div>

        </div>
      </section> */}
         
    </>
  );
};


export default Layout;

