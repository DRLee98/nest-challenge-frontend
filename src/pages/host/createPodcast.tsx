import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { MY_PODCAST_QUERY } from "./getMyPodcast";
import { AccountButton } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";
import { useHistory } from "react-router-dom";

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      error
      id
    }
  }
`;

interface IFormProps {
  title: string;
  categoryName: string;
  description: string;
  thumbnailUrl: string;
}

export const CreatePodcast = () => {
  const history = useHistory();
  const [createPodcastMutation, { data, loading }] = useMutation<
    createPodcastMutation,
    createPodcastMutationVariables
  >(CREATE_PODCAST_MUTATION, {
    refetchQueries: [
      {
        query: MY_PODCAST_QUERY,
      },
    ],
  });
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const { title, categoryName, description, thumbnailUrl } = getValues();
  const onSubmit = async () => {
    await createPodcastMutation({
      variables: {
        input: {
          title,
          categoryName,
          description,
          thumbnailUrl,
        },
      },
    });
    const ok = data?.createPodcast.ok;
    if (ok) {
      history.push("/");
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Create Podcast | Podcast</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Create Podcast</h4>
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
          name="categoryName"
          placeholder="Category Name"
          ref={register({ required: "Category is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          ref={register({ required: "Description Name is required." })}
        />
        <input
          className="input"
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail Url"
          ref={register({ required: "Thumbnail Url Name is required." })}
        />
        <AccountButton
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Podcast"
        />
        {data?.createPodcast?.error && (
          <FormError errorMessage={data.createPodcast.error} />
        )}
      </form>
    </div>
  );
};
