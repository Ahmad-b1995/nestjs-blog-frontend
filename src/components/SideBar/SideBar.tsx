import { Layout } from "antd";
import TopicMenu from "../TopicMenu";


const SideBar = () => {
  return (
    <Layout.Sider
      className="h-full"
      breakpoint="lg"
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      <TopicMenu />
    </Layout.Sider>
  );
};

export default SideBar;
