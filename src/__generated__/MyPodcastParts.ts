/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyPodcastParts
// ====================================================

export interface MyPodcastParts_category {
  __typename: "Category";
  name: string;
}

export interface MyPodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: MyPodcastParts_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
}
