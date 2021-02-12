/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastQuery
// ====================================================

export interface getPodcastQuery_getPodcast_podcast_category {
  __typename: "Category";
  name: string;
}

export interface getPodcastQuery_getPodcast_podcast_creator {
  __typename: "User";
  email: string;
  id: number;
}

export interface getPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  createdAt: any;
  title: string;
  description: string;
}

export interface getPodcastQuery_getPodcast_podcast_reviews_creator {
  __typename: "User";
  email: string;
}

export interface getPodcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  updatedAt: any;
  title: string;
  text: string;
  rating: number;
  creator: getPodcastQuery_getPodcast_podcast_reviews_creator;
}

export interface getPodcastQuery_getPodcast_podcast_listeners {
  __typename: "User";
  id: number;
}

export interface getPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: getPodcastQuery_getPodcast_podcast_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
  creator: getPodcastQuery_getPodcast_podcast_creator;
  episodes: getPodcastQuery_getPodcast_podcast_episodes[];
  reviews: getPodcastQuery_getPodcast_podcast_reviews[];
  listeners: getPodcastQuery_getPodcast_podcast_listeners[];
}

export interface getPodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcastQuery_getPodcast_podcast | null;
}

export interface getPodcastQuery {
  getPodcast: getPodcastQuery_getPodcast;
}

export interface getPodcastQueryVariables {
  input: PodcastSearchInput;
}
