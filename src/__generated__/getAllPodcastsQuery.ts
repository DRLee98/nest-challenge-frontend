/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPodcastsQuery
// ====================================================

export interface getAllPodcastsQuery_getAllPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface getAllPodcastsQuery_getAllPodcasts_podcasts_creator {
  __typename: "User";
  email: string;
}

export interface getAllPodcastsQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: getAllPodcastsQuery_getAllPodcasts_podcasts_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
  creator: getAllPodcastsQuery_getAllPodcasts_podcasts_creator;
}

export interface getAllPodcastsQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getAllPodcastsQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastsQuery_allCategories_categories {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface getAllPodcastsQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: getAllPodcastsQuery_allCategories_categories[] | null;
}

export interface getAllPodcastsQuery {
  getAllPodcasts: getAllPodcastsQuery_getAllPodcasts;
  allCategories: getAllPodcastsQuery_allCategories;
}
