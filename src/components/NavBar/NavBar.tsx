import { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";
import logo from "/public/dextrading.png";
import TopicMenu from "../TopicMenu";


const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar flex items-center justify-between shadow-md bg-white p-4">
      <Button
        className="menu md:hidden"
        type="primary"
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClose={toggleDrawer}
        open={open}
      >
        <TopicMenu />
      </Drawer>
      <a href="/">
        <img src={logo} className="logo h-8 ml-4" alt="logo" />
      </a>
    </nav>
  );
};

export default NavBar;
