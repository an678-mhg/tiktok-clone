import Link from "next/link";
import React from "react";
import Facebook from "../icons/Facebook";
import Feedback from "../icons/Feedback";
import Google from "../icons/Google";
import Logo from "../icons/Logo";
import { signIn } from "next-auth/react";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Meta from "../components/Meta";

const signInMethods = [
  {
    icons: Facebook,
    content: "Continue with Facebook",
    provider: "facebook",
  },
  {
    icons: Google,
    content: "Continue with Google",
    provider: "google",
  },
];

const SignIn = () => {
  return (
    <div className="h-screen text-white">
      <Meta
        title="SignIn | Tiktok"
        description="SignIn page from tiktok"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>

        <button className="flex items-center text-sm font-medium text-white hover:underline">
          <Feedback />{" "}
          <span className="ml-2 inline-block">Feedback and help</span>
        </button>
      </div>

      <div>
        <div className="mx-auto w-[375px] max-w-[calc(100%-32px)] text-center">
          <h4 className="my-4 text-[32px] font-bold">Log in to TikTok</h4>
          <p className="mt-3 mb-[32px] text-[15px] font-normal text-[rgba(255,255,255,0.75)]">
            Manage your account, check notifications, comment on videos, and
            more.
          </p>

          <div>
            {signInMethods.map((item) => (
              <button
                key={item.provider}
                onClick={() => signIn(item.provider)}
                className="relative mb-4 flex w-full items-center justify-center border border-gray-600 px-4 py-2.5 last:mb-0"
              >
                <div className="absolute left-4 top-[50%] translate-y-[-50%]">
                  <item.icons />
                </div>{" "}
                <span className="text-[15px]">{item.content}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const redirect = (context.query?.redirect as string) || "/";

  if (session?.user) {
    return {
      redirect: {
        permanent: true,
        destination: redirect,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default SignIn;
