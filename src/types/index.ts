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

export interface Comment {
  comment: string;
  createdAt: Date;
  id: string;
  updatedAt: Date;
  user: User;
  _count: {
    reply: number;
  };
}

export interface Video<T> {
  id: string;
  title: string;
  videoUrl: string;
  userId: string;
  width: number;
  height: number;
  thumnail?: any;
  createdAt: Date;
  updatedAt: Date;
  user: T;
  _count: {
    likes: number;
    comment: number;
  };
  isLike: boolean;
  isFollow: boolean;
  comment?: Comment[];
}

export interface Account extends User {
  _count: { followings: number; followers: number };
}

export interface VideoDefault {
  id: string;
  title: string;
  videoUrl: string;
  userId: string;
  width: number;
  height: number;
  thumnail?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  videoId: string;
  userId: string;
  video: VideoDefault;
}

export interface Count {
  followers: number;
  followings: number;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  emailVerified?: any;
  image: string;
  bio?: any;
  video: VideoDefault[];
  likes: Like[];
  _count: Count;
}

export interface Reply {
  comment: string;
  createdAt: Date;
  id: string;
  replyToId: string;
  updatedAt: Date;
  user: User;
}
