import React from "react";

export interface Layout {
  children: React.ReactNode;
}

export interface Icons {
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: any;
  image: string;
  bio?: any;
}

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  userId: string;
  width: number;
  height: number;
  thumnail?: any;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  _count: {
    likes: number;
  };
  isLike: boolean;
  isFollow: boolean;
}

export interface Account extends User {
  _count: { followings: number; followers: number };
}
