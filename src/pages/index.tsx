import { type NextPage } from "next";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Sidebar />
      <div className="ml-[348px] mt-5 flex-1">
        <Main />
      </div>
    </MainLayout>
  );
};

export default Home;
