/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: subAndFeedQuery
// ====================================================

export interface subAndFeedQuery_me_subsriptions_category {
  __typename: "Category";
  name: string;
}

export interface subAndFeedQuery_me_subsriptions {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  description: string;
  thumbnailUrl: string;
  rating: number;
  category: subAndFeedQuery_me_subsriptions_category | null;
}

export interface subAndFeedQuery_me_playedEpisodes {
  __typename: "Episode";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  description: string;
}

export interface subAndFeedQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  subsriptions: subAndFeedQuery_me_subsriptions[];
  playedEpisodes: subAndFeedQuery_me_playedEpisodes[];
}

export interface subAndFeedQuery {
  me: subAndFeedQuery_me;
}
