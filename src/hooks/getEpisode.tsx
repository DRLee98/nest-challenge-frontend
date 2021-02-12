import { gql, useQuery } from "@apollo/client";
import {
  getEpisodeQuery,
  getEpisodeQueryVariables,
} from "../__generated__/getEpisodeQuery";

const EPISODE_QUERY = gql`
  query getEpisodeQuery($input: EpisodesSearchInput!) {
    getEpisode(input: $input) {
      ok
      error
      episode {
        id
        createdAt
        updatedAt
        title
        description
      }
    }
  }
`;

export const GetEpisode = (podcastId: number, episodeId: number) => {
  return useQuery<getEpisodeQuery, getEpisodeQueryVariables>(EPISODE_QUERY, {
    variables: {
      input: {
        podcastId,
        episodeId,
      },
    },
  });
};
