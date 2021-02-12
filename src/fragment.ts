import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    thumbnailUrl
    description
    category {
      name
    }
    rating
    createdAt
    updatedAt
    creator {
      email
    }
  }
`;

export const My_PODCAST_FRAGMENT = gql`
  fragment MyPodcastParts on Podcast {
    id
    title
    thumbnailUrl
    description
    category {
      name
    }
    rating
    createdAt
    updatedAt
  }
`;
