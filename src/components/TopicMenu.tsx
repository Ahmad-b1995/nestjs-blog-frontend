import { useEffect, useState } from 'react';
import { TfiWrite } from "react-icons/tfi";
import { IoImageOutline } from "react-icons/io5";
import { CiHashtag } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineArticle } from "react-icons/md";
import { Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";

const items: MenuProps['items'] = [
  {
    key: '0',
    label: 'Blog',
    icon: <TfiWrite />,
    children: [
      { key: '1', label: 'Media', icon: <IoImageOutline /> },
      { key: '2', label: 'Tags', icon: <CiHashtag /> },
      { key: '3', label: 'Categories', icon: <BiCategoryAlt /> },
      { key: '4', label: 'Posts', icon: <MdOutlineArticle /> },
    ],
  },
];

const MenuComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const keyMap: { [key: string]: string } = {
      '/blog/media': '1',
      '/blog/tags': '2',
      '/blog/categories': '3',
      '/blog/posts': '4',
    };

    const selectedKey = keyMap[path] || (path.startsWith('/blog/posts') ? '4' : '');
    if (selectedKey) {
      setSelectedKeys([selectedKey]);
      setDefaultOpenKeys(['0']);
    }
  }, [location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    const keyRouteMap: { [key: string]: string } = {
      '1': '/blog/media',
      '2': '/blog/tags',
      '3': '/blog/categories',
      '4': '/blog/posts',
    };
    navigate(keyRouteMap[e.key]);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/auth');
  };

  return (
    <div className='h-full flex flex-col items-center justify-between pb-4'>
      {
        defaultOpenKeys.length > 0 &&
        <Menu
          onClick={onClick}
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          items={items}
        />
      }
      <Button onClick={handleLogout} type="text" icon={<IoLogOutOutline />} iconPosition="end">
        Logout
      </Button>
    </div>
  );
};

export default MenuComponent;
