import { type NextPage } from "next";
import Sidebar from "../components/Sidebar";
import VideoItem from "../components/Video/VideoItem";
import MainLayout from "../layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Sidebar />
      <div className="ml-[348px] mt-5 flex-1">
        <div className="p-5">
          <VideoItem />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
