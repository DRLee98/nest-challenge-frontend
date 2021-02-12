/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeQuery
// ====================================================

export interface getEpisodeQuery_getEpisode_episode {
  __typename: "Episode";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  description: string;
}

export interface getEpisodeQuery_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: getEpisodeQuery_getEpisode_episode | null;
}

export interface getEpisodeQuery {
  getEpisode: getEpisodeQuery_getEpisode;
}

export interface getEpisodeQueryVariables {
  input: EpisodesSearchInput;
}
