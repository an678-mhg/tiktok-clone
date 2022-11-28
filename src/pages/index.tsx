import { type NextPage } from "next";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Sidebar />
      <div className="ml-[348px] flex-1">Main</div>
    </MainLayout>
  );
};

export default Home;
