import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import logo from "./logo.png";
const SideBar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickActive = (e) => {
    // Toggle isActive state on click
    /* == Active attribute == */
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink(e) {
      linkColor.forEach((item) => item.classList.remove("active"));
      e.currentTarget.classList.toggle("active");
    }
    linkColor.forEach((item) => colorLink(e));
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login", { replace: true });
  };
  return (
    <div className="container" id="navbar">
      <nav className="nav">
        <div>
          <div className="nav_brand">
            <Link to={"/"}>
              <FiCodesandbox color="#fff" size={30} />
            </Link>
          </div>
          <ul>
            <li>
              <Link
                to={"/"}
                className="nav_link active"
                onClick={handleClickActive}
              >
                <MdOutlineDashboard size={20} />

                <span className="nav_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/analysis"}
                className="nav_link"
                onClick={handleClickActive}
              >
                <TbBrandGoogleAnalytics size={20} />
                <span className="nav_name">Analytics</span>
              </Link>
            </li>
          </ul>
        </div>

        <span className="nav_link" onClick={onLogout}>
          <IoIosLogOut size={20} />
        </span>
      </nav>
    </div>
  );
};

export default SideBar;
