import { type NextPage } from "next";
import Sidebar from "../components/Sidebar";
import VideoItem from "../components/Video/VideoItem";
import MainLayout from "../layout/MainLayout";
import { Video } from "../types";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.video.getVideos.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <MainLayout>
      <Sidebar />
      <div className="ml-[348px] mt-5 flex-1">
        <div className="px-5 pb-5">
          {isLoading && <div>Loading...</div>}
          {data?.map((video) => (
            <VideoItem video={video as Video} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
