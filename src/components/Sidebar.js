import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { ImBook } from "react-icons/im";
import { MdOutlineSupervisedUserCircle, MdHistory } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import useWindowSize from "../assets/useWindowSize";

import "./Sidebar.css";

const isAuth = sessionStorage.getItem("user-info");

const Sidebar = () => {
  const size = useWindowSize();

  return (
    <div className="sidebar">
      <div>
        <Nav
          variant="pills"
          navbar
          defaultActiveKey="/dashboard/marks"
          className="flex-column justify-content-center"
          style={{ padding: "20px 10px" }}
        >
          <Nav.Item>
            <Nav.Link
              as={Link}
              eventKey="/dashboard/marks"
              to="/dashboard/marks"
            >
              <ImBook size={24} />
              {size.width > 767 ? "Marks" : ""}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {isAuth ? (
              <Nav.Link
                as={Link}
                eventKey="/dashboard/staffs"
                to="/dashboard/staffs"
              >
                <MdOutlineSupervisedUserCircle size={24} />
                {size.width > 767 ? "Staffs" : ""}
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav.Item>
          <Nav.Item>
            {isAuth && JSON.parse(isAuth).role === "admin" ? (
              <Nav.Link
                as={Link}
                eventKey="/dashboard/action-history"
                to="/dashboard/action-history"
              >
                <MdHistory size={24} />
                {size.width > 767 ? "Action History" : ""}
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav.Item>
        </Nav>
      </div>
      {/* <div className="sidebar-bottom">
        <Nav>
          <Nav.Item>
            <Nav.Link href="../profile/">
              <FaUserCircle size={24} />
              {size.width > 767
                ? `Welcome, ${
                    isAuth && JSON.parse(isAuth).role === "admin"
                      ? "Admin"
                      : isAuth && JSON.parse(isAuth).role === "staff"
                      ? `${JSON.parse(isAuth).username}`
                      : "Guest"
                  }`
                : `${
                    isAuth && JSON.parse(isAuth).role === "admin"
                      ? "Admin"
                      : isAuth && JSON.parse(isAuth).role === "staff"
                      ? `${JSON.parse(isAuth).username}`
                      : "Guest"
                  }`}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div> */}
    </div>
  );
};

export default Sidebar;
