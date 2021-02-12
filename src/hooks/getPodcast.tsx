import { gql, useQuery } from "@apollo/client";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from "../__generated__/getPodcastQuery";
import { PODCAST_FRAGMENT } from "../fragment";

export const PODCAST_QUERY = gql`
  query getPodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
        creator {
          id
          email
        }
        episodes {
          id
          createdAt
          title
          description
        }
        reviews {
          id
          updatedAt
          title
          text
          rating
          creator {
            email
          }
        }
        listeners {
          id
        }
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const GetPodcast = (id: number) => {
  return useQuery<getPodcastQuery, getPodcastQueryVariables>(PODCAST_QUERY, {
    variables: {
      input: {
        id,
      },
    },
  });
};
