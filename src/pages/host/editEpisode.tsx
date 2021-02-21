import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { AccountButton } from "../../components/button";
import { FormError } from "../../components/form-error";
import { Loader } from "../../components/loader";
import { EditEpisodeHook } from "../../hooks/editHooks";
import { GetEpisode } from "../../hooks/getEpisode";

interface IFormProps {
  title: string;
  description: string;
}

interface IEpisodeParams {
  podcastId: string;
  episodeId: string;
}

export const EditEpisode = () => {
  const history = useHistory();
  const { podcastId, episodeId } = useParams<IEpisodeParams>();
  const { data: episodeData, loading: episodeLoading } = GetEpisode(
    +podcastId,
    +episodeId,
  );
  const [updateEpisodeMutation, { data, loading }] = EditEpisodeHook(
    +podcastId,
  );

  const episdoe = episodeData?.getEpisode.episode;

  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      title: episdoe?.title,
      description: episdoe?.description,
    },
  });

  const { title, description } = getValues();
  const onSubmit = () => {
    updateEpisodeMutation({
      variables: {
        input: {
          podcastId: +podcastId,
          episodeId: +episodeId,
          ...(title && { title }),
          ...(description && { description }),
        },
      },
    });
    const ok = data?.updateEpisode.ok;
    if (ok) {
      history.goBack();
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Edit Episode | Podcast</title>
      </Helmet>
      {episodeLoading ? (
        <Loader />
      ) : (
        <>
          <h4 className="font-semibold text-2xl mb-3">Edit Episode</h4>
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
              name="description"
              placeholder="Description"
              ref={register()}
            />
            <AccountButton
              loading={loading}
              canClick={formState.isValid}
              actionText="Edit Episode"
            />
            {data?.updateEpisode?.error && (
              <FormError errorMessage={data.updateEpisode.error} />
            )}
          </form>
        </>
      )}
    </div>
  );
};
