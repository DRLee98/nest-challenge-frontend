/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcastQuery
// ====================================================

export interface myPodcastQuery_me_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface myPodcastQuery_me_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: myPodcastQuery_me_podcasts_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
}

export interface myPodcastQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  podcasts: myPodcastQuery_me_podcasts[];
}

export interface myPodcastQuery {
  me: myPodcastQuery_me;
}
