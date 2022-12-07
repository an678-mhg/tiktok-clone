import { type NextPage } from "next";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Sidebar />
      <div className="ml-[48px] flex-1 md:ml-[348px] lg:mt-5">
        <Main type="getVideos" />
      </div>
    </MainLayout>
  );
};

export default Home;
