import { type NextPage } from "next";
import Main from "../components/Main";
import Meta from "../components/Meta";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Meta
        title="Home | Tiktok"
        description="Home page from tiktok"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <Sidebar />
      <div className="ml-[48px] flex-1 lg:ml-[348px] lg:mt-5">
        <Main type="getVideos" />
      </div>
    </MainLayout>
  );
};

export default Home;
