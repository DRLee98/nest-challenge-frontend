import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { MY_PODCAST_QUERY } from "../pages/host/getMyPodcast";
import { deleteEpisodeMutation } from "../__generated__/deleteEpisodeMutation";
import { deletePodcastMutation } from "../__generated__/deletePodcastMutation";
import { PodcastParts } from "../__generated__/PodcastParts";
import {
  updateEpisodeMutation,
  updateEpisodeMutationVariables,
} from "../__generated__/updateEpisodeMutation";
import {
  updatePodcastMutation,
  updatePodcastMutationVariables,
} from "../__generated__/updatePodcastMutation";
import { PODCAST_QUERY } from "./getPodcast";

const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

const UPDATE_EPISODE_MUTATION = gql`
  mutation updateEpisodeMutation($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const EditPodcastHook = (id: number) => {
  return useMutation<updatePodcastMutation, updatePodcastMutationVariables>(
    UPDATE_PODCAST_MUTATION,
    {
      refetchQueries: [
        {
          query: PODCAST_QUERY,
          variables: {
            input: {
              id,
            },
          },
        },
      ],
    },
  );
};

export const EditEpisodeHook = (id: number) => {
  return useMutation<updateEpisodeMutation, updateEpisodeMutationVariables>(
    UPDATE_EPISODE_MUTATION,
    {
      refetchQueries: [
        {
          query: PODCAST_QUERY,
          variables: {
            input: {
              id,
            },
          },
        },
      ],
    },
  );
};
