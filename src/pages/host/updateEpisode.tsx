import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { AccountButton } from "../../components/button";
import { FormError } from "../../components/form-error";
import { Loader } from "../../components/loader";
import { PODCAST_QUERY } from "../../hooks/getPodcast";
import {
  createEpisodeMutation,
  createEpisodeMutationVariables,
} from "../../__generated__/createEpisodeMutation";
import { PodcastParts } from "../../__generated__/PodcastParts";

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutation($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      ok
      error
      id
    }
  }
`;

interface IFormProps {
  title: string;
  description: string;
}

interface IEpisodeParams {
  podcastId: string;
}

export const UpdateEpisode = () => {
  const { podcastId } = useParams<IEpisodeParams>();
  const history = useHistory();
  // const client = useApolloClient();
  // const onCompleted = async (data: any) => {
  //   const {
  //     createEpisode: { ok, id },
  //   } = data;
  //   if (ok) {
  //     const { title, description } = getValues();
  //     const queryResult = await client.readQuery({
  //       query: PODCAST_QUERY,
  //       variables: { input: { id: +podcastId } },
  //     });
  //     console.log(queryResult);
  //     client.writeQuery({
  //       query: PODCAST_QUERY,
  //       data: {
  //         getPodcast: {
  //           ...queryResult.getPodcast,
  //           episodes: [
  //             {
  //               title,
  //               id,
  //               description,
  //               createdAt: new Date().toISOString(),
  //               __typename: "Episode",
  //             },
  //             ...queryResult.getPodcast.episodes,
  //           ],
  //         },
  //       },
  //     });
  //     history.push("/");
  //   }
  // };
  const [createEpisodeMutation, { data, loading }] = useMutation<
    createEpisodeMutation,
    createEpisodeMutationVariables
  >(CREATE_EPISODE_MUTATION, {
    refetchQueries: [
      {
        query: PODCAST_QUERY,
        variables: {
          input: {
            id: +podcastId,
          },
        },
      },
    ],
  });
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const { title, description } = getValues();
  const onSubmit = () => {
    createEpisodeMutation({
      variables: {
        input: {
          podcastId: +podcastId,
          title,
          description,
        },
      },
    });
    const ok = data?.createEpisode.ok;
    if (ok) {
      history.goBack();
    }
    if (!loading) {
      history.goBack();
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Create Episode | Podcast</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h4 className="font-semibold text-2xl mb-3">Create Episode</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
          >
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Title"
              ref={register({ required: "Title is required." })}
            />
            <input
              className="input"
              type="text"
              name="description"
              placeholder="Description"
              ref={register({ required: "Description Name is required." })}
            />
            <AccountButton
              loading={loading}
              canClick={formState.isValid}
              actionText="Create Episode"
            />
            {data?.createEpisode?.error && (
              <FormError errorMessage={data.createEpisode.error} />
            )}
          </form>
        </>
      )}
    </div>
  );
};
