/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcastsQuery
// ====================================================

export interface searchPodcastsQuery_searchPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts_creator {
  __typename: "User";
  email: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: searchPodcastsQuery_searchPodcasts_podcasts_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
  creator: searchPodcastsQuery_searchPodcasts_podcasts_creator;
}

export interface searchPodcastsQuery_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcastsQuery_searchPodcasts_podcasts[] | null;
}

export interface searchPodcastsQuery_allCategories_categories {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface searchPodcastsQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: searchPodcastsQuery_allCategories_categories[] | null;
}

export interface searchPodcastsQuery {
  searchPodcasts: searchPodcastsQuery_searchPodcasts;
  allCategories: searchPodcastsQuery_allCategories;
}

export interface searchPodcastsQueryVariables {
  input: SearchPodcastsInput;
}
