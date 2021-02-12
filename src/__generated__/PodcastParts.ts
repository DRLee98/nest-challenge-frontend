/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_category {
  __typename: "Category";
  name: string;
}

export interface PodcastParts_creator {
  __typename: "User";
  email: string;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: PodcastParts_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
  creator: PodcastParts_creator;
}
