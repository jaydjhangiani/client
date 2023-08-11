import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  //   const [menuToRender, setMenuToRender] = useState([]);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      title: "home",
      icon: <i class="ri-home-7-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "transaction",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transaction"),
      path: "/transaction",
    },
    {
      title: "request",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/request"),
      path: "/request",
    },
    {
      title: "profile",
      icon: <i class="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "logout",
      icon: <i class="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];
  const adminMenu = [
    {
      title: "home",
      icon: <i class="ri-home-7-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "users",
      icon: <i class="ri-user-settings-line"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "transaction",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transaction"),
      path: "/transaction",
    },
    {
      title: "request",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/request"),
      path: "/request",
    },
    {
      title: "profile",
      icon: <i class="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "logout",
      icon: <i class="ri-logout-box-line"></i>,
      onClick: () => localStorage.removeItem("token"),
      path: "/login",
    },
  ];
  const menuToRender = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="menu">
          {menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && (
                  <h1 className="text-white text-sm">{item.title}</h1>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header flex justify-between items-center">
          <div className="text-white">
            {!collapsed && (
              <i
                class="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            {collapsed && (
              <i
                class="ri-menu-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
          </div>
          <div className="">
            <h1 className="text-xl text-white">SUGAR JAR</h1>
          </div>
          <div className="">
            <h1 className="text-sm underline text-white">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
