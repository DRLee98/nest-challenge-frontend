import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { MY_PODCAST_QUERY } from "../pages/host/getMyPodcast";
import { deleteEpisodeMutation } from "../__generated__/deleteEpisodeMutation";
import { deletePodcastMutation } from "../__generated__/deletePodcastMutation";
import { getPodcastQuery_getPodcast_podcast_episodes } from "../__generated__/getPodcastQuery";
import { PodcastParts } from "../__generated__/PodcastParts";
import { PODCAST_QUERY } from "./getPodcast";

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcastMutation($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisodeMutation($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const DeletePodcast = () => {
  // const client = useApolloClient();
  // const history = useHistory();

  // const onCompleted = (id: number) => {
  //   const queryResult = client.readQuery({ query: MY_PODCAST_QUERY });
  //   client.writeQuery({
  //     query: MY_PODCAST_QUERY,
  //     data: {
  //       me: {
  //         ...queryResult.me,
  //         podcasts: [
  //           ...queryResult.me.podcasts.filter(
  //             (podcast: PodcastParts) => podcast.id !== id,
  //           ),
  //         ],
  //       },
  //     },
  //   });
  //   history.push("/");
  // };

  return useMutation<deletePodcastMutation>(DELETE_PODCAST_MUTATION, {
    refetchQueries: [
      {
        query: MY_PODCAST_QUERY,
      },
    ],
  });
};

export const DeleteEpisode = (id: number) => {
  // const client = useApolloClient();
  // const history = useHistory();

  // const onCompleted = (id: number) => {
  //   const queryResult = client.readQuery({ query: PODCAST_QUERY });
  //   client.writeQuery({
  //     query: PODCAST_QUERY,
  //     data: {
  //       getPodcast: {
  //         ...queryResult.getPodcast,
  //         podcast: {
  //           ...queryResult.getPodcast.podcast,
  //           episodes: [
  //             ...queryResult.getPodcast.podcast.episodes.filter(
  //               (episode: getPodcastQuery_getPodcast_podcast_episodes) =>
  //                 episode.id !== id,
  //             ),
  //           ],
  //         },
  //       },
  //     },
  //   });
  //   history.push("/");
  // };

  return useMutation<deleteEpisodeMutation>(DELETE_EPISODE_MUTATION, {
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
  });
};
