import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../layout/MainLayout";

const Error = () => {
  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-61px)] w-full flex-col items-center justify-center">
        <div>
          <LazyLoadImage src="/error.png" effect="opacity" />
        </div>

        <div className="mt-5">
          <h1 className="text-center font-semibold">Something went wrong!</h1>
          <Link
            href="/"
            className="mt-5 block w-full rounded-md border border-primary px-4 py-2 text-center text-sm font-normal text-primary"
          >
            Return home page
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Error;
