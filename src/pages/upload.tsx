import React, { useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { AiOutlineCloudUpload, AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Upload = () => {
  const videoPreviewRef = useRef<any>();

  const [videoFile, setVideoFile] = useState<File | null>();
  const [videoPreview, setVideoPreview] = useState<string | null>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { mutateAsync } = trpc.video.createVideo.useMutation();

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];

    if (!file) return;

    if (!file.type.startsWith("video")) {
      return toast.error("Only accept video files");
    }

    if (file.size / 1000000 > 30) {
      return toast.error("Your file cannot exceed 30MB");
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleDiscard = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  const getVideoWithHeight = () => {
    const width = videoPreviewRef?.current?.videoHeight as number;
    const height = videoPreviewRef?.current?.videoWidth as number;
    return {
      width,
      height,
    };
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("You haven't selected any videos yet");
      return;
    }

    console.log(getVideoWithHeight());

    const toastId = toast.loading("Upload....");
    setLoading(true);
    try {
      const url = `https://api.cloudinary.com/v1_1/dhz1uowbg/video/upload`;

      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("upload_preset", "rxdryhqe");

      const videoUrl = await axios.post(url, formData, {
        onUploadProgress: (p) => {
          const { loaded, total } = p;
          let percent = Math.floor((loaded * 100) / total!);
          toast.loading(`Upload ${percent}%....`, { id: toastId });
        },
      });

      const res = await mutateAsync({
        title,
        videoHeight: getVideoWithHeight().height,
        videoWidth: getVideoWithHeight().width,
        videoUrl: videoUrl.data?.url,
      });

      setLoading(false);

      toast.dismiss(toastId);
      toast.success("Upload video success!");

      handleDiscard();
      setTitle("");
      router.push(`/video/${res.video.id}`);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.error("Something went wrong!");
    }
  };

  return (
    <MainLayout>
      <div className="mt-5 h-[calc(100vh-100px)] w-full rounded-md bg-[#333] p-6">
        <div>
          <h1 className="text-[24px] font-bold">Upload video</h1>
          <p className="text-[16px] font-normal">
            Post a video to your account
          </p>
        </div>

        <div className="mt-6 flex items-center">
          <label
            htmlFor="videoFileInput"
            className={`flex aspect-[9/16] w-[260px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed ${
              !videoPreview && "p-[35px]"
            } overflow-hidden text-center hover:border-primary`}
          >
            {!videoPreview ? (
              <div>
                <input
                  onChange={handleVideoFileChange}
                  hidden
                  type="file"
                  id="videoFileInput"
                />
                <div className="flex w-full justify-center">
                  <AiOutlineCloudUpload fontSize={40} />
                </div>

                <div className="mt-6">
                  <h3 className="text-[16px] font-semibold">
                    Select video to upload
                  </h3>
                  <p className="mt-3 text-[13px] font-normal text-[rgba(255,255,255,0.75)]">
                    Or drag and drop a file
                  </p>
                </div>

                <div className="mt-6">
                  <p className="my-2 text-[13px] font-normal text-[rgba(255,255,255,0.75)]">
                    MP4 or WebM
                  </p>
                  <p className="my-2 text-[13px] font-normal text-[rgba(255,255,255,0.75)]">
                    720x1280 resolution or higher
                  </p>
                  <p className="my-2 text-[13px] font-normal text-[rgba(255,255,255,0.75)]">
                    Up to 30 minutes
                  </p>
                  <p className="my-2 text-[13px] font-normal text-[rgba(255,255,255,0.75)]">
                    Less than 30 MB
                  </p>
                </div>

                <label
                  htmlFor="videoFileInput"
                  className="mt-6 block w-full cursor-pointer rounded-[2px] bg-primary px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Select file
                </label>
              </div>
            ) : (
              <div className="h-full w-full">
                <video
                  muted
                  ref={videoPreviewRef}
                  className="h-full w-full"
                  src={videoPreview}
                  controls
                  autoPlay
                />
              </div>
            )}
          </label>
          <form onSubmit={handleUploadVideo} className="ml-6 flex-1">
            <div className="mb-6 w-full">
              <label className="block text-[16px] font-semibold">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-4 w-full rounded-[4px] border border-[rgba(255,255,255,0.75)] bg-transparent p-2 text-sm text-white"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block text-[16px] font-semibold">Cover</label>
              <div className="mt-4 h-[168px] w-full rounded-[4px] border border-[rgba(255,255,255,0.75)] bg-transparent p-2 text-sm text-white">
                <div className="flex h-full w-[85px] items-center justify-center rounded-sm bg-[#222]">
                  <AiOutlineUpload fontSize={20} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={loading}
                type="button"
                onClick={handleDiscard}
                className="w-full rounded-sm border border-[rgba(255,255,255,0.75)] bg-transparent px-4 py-2 text-sm font-semibold text-white"
              >
                Discard
              </button>
              <button
                disabled={loading}
                className="w-full rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: `/sign-in?redirect=/upload`,
        permanent: false,
      },
    };
  }
};

export default Upload;
