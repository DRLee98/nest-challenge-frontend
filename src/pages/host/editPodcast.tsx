import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { AccountButton } from "../../components/button";
import { FormError } from "../../components/form-error";
import { GetPodcast, PODCAST_QUERY } from "../../hooks/getPodcast";
import { Loader } from "../../components/loader";
import { gql, useMutation } from "@apollo/client";
import {
  updatePodcastMutation,
  updatePodcastMutationVariables,
} from "../../__generated__/updatePodcastMutation";

const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IParamProps {
  id: string;
}

interface IFormProps {
  title?: string;
  categoryName?: string;
  description?: string;
  thumbnailUrl?: string;
}

export const EditPodcast = () => {
  const history = useHistory();
  const { id } = useParams<IParamProps>();

  const [updatePodcastMutation, { data, loading }] = useMutation<
    updatePodcastMutation,
    updatePodcastMutationVariables
  >(UPDATE_PODCAST_MUTATION, {
    refetchQueries: [
      {
        query: PODCAST_QUERY,
        variables: {
          input: {
            id: +id,
          },
        },
      },
    ],
  });

  const { data: podcastData } = GetPodcast(+id);

  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onBlur",
    defaultValues: {
      title: podcastData?.getPodcast.podcast?.title,
      categoryName: podcastData?.getPodcast.podcast?.category?.name,
      ...(podcastData?.getPodcast.podcast?.description && {
        description: podcastData?.getPodcast.podcast?.description,
      }),
      ...(podcastData?.getPodcast.podcast?.thumbnailUrl && {
        thumbnailUrl: podcastData?.getPodcast.podcast?.thumbnailUrl,
      }),
    },
  });
  const { title, categoryName, description, thumbnailUrl } = getValues();
  const onSubmit = async () => {
    await updatePodcastMutation({
      variables: {
        input: {
          id: +id,
          payload: {
            ...(title && { title }),
            ...(categoryName && { categoryName }),
            ...(description && { description }),
            ...(thumbnailUrl && { thumbnailUrl }),
          },
        },
      },
    });

    if (data?.updatePodcast.ok) {
      history.push(`/podcast/${id}`);
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Edit Podcast | Podcast</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h4 className="font-semibold text-2xl mb-3">Edit Podcast</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
          >
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Title"
              ref={register()}
            />
            <input
              className="input"
              type="text"
              name="categoryName"
              placeholder="Category"
              ref={register()}
            />
            <input
              className="input"
              type="text"
              name="description"
              placeholder="Description"
              ref={register()}
            />
            <input
              className="input"
              type="text"
              name="thumbnailUrl"
              placeholder="Thumbnail Url"
              ref={register()}
            />
            <AccountButton
              loading={loading}
              canClick={formState.isValid}
              actionText="Edit Podcast"
            />
            {data?.updatePodcast?.error && (
              <FormError errorMessage={data.updatePodcast.error} />
            )}
          </form>
        </>
      )}
    </div>
  );
};
