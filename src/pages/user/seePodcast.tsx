import {
  faBell,
  faEdit,
  faEraser,
  faPlay,
  faPlusCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { GetPodcast, PODCAST_QUERY } from "../../hooks/getPodcast";
import { DeleteEpisode, DeletePodcast } from "../../hooks/deleteHooks";
import { useMe } from "../../hooks/useMe";
import { UserRole } from "../../__generated__/globalTypes";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  createReviewMutation,
  createReviewMutationVariables,
} from "../../__generated__/createReviewMutation";
import { markEpisodeAsPlayedMtation } from "../../__generated__/markEpisodeAsPlayedMtation";
import { ToggleSubscribe } from "../../hooks/toggleSubscribe";
import { ReviewButton } from "../../components/button";

const CREATE_REVIEW_MUTATION = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
      id
    }
  }
`;

const MARK_EPISODE_AS_PLAYED_MUTATION = gql`
  mutation markEpisodeAsPlayedMtation($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed(input: $input) {
      ok
      error
    }
  }
`;

interface IPodcastParams {
  id: string;
}

interface IFormProps {
  title: string;
  text: string;
}

export const PodcastDetail = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { data: meData } = useMe();
  const { id } = useParams<IPodcastParams>();
  const { data, loading } = GetPodcast(+id);
  const [deletePodcastMutation] = DeletePodcast();
  const [deleteEpisodeMutation] = DeleteEpisode(+id);
  const find = meData?.me.subsriptions.filter((sub: any) => sub.id === +id);
  const [star, setStar] = useState(1);
  const [subscribe, setSubscribe] = useState(find && find.length > 0);
  const { register, getValues, handleSubmit, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  const { title, text } = getValues();
  const onCompleted = () => {
    if (reviewData?.createReview.ok) {
      const queryResult = client.readQuery({ query: PODCAST_QUERY });
      client.writeQuery({
        query: PODCAST_QUERY,
        data: {
          getPodcast: {
            ...queryResult.getPodcast,
            podcast: {
              reviews: [
                {
                  id: reviewData?.createReview.id,
                  title,
                  text,
                  rating: star,
                  __typename: "Review",
                },
                ...queryResult.getPodcast.podcast.reviews,
              ],
              ...queryResult.getPodcast.podcast,
            },
          },
        },
      });
    }
  };

  const deletePodcast = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete: boolean = confirm(`Y? N?`);
    if (confirmDelete) {
      deletePodcastMutation({
        variables: {
          input: {
            id: +id,
          },
        },
      });
    }
  };

  const deleteEpisode = async (episodeId: number) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete: boolean = confirm(`Y? N?`);
    if (confirmDelete) {
      await deleteEpisodeMutation({
        variables: {
          input: {
            podcastId: +id,
            episodeId,
          },
        },
      });
      history.go(0);
    }
  };

  const playEpisode = (episodeId: number) => {
    markEpisodeAsPlayedMtation({
      variables: {
        input: {
          id: episodeId,
        },
      },
    });
  };

  const [
    createReviewMutation,
    { data: reviewData, loading: reviewLoading },
  ] = useMutation<createReviewMutation, createReviewMutationVariables>(
    CREATE_REVIEW_MUTATION,
    {
      onCompleted,
    },
  );

  const [markEpisodeAsPlayedMtation] = useMutation<markEpisodeAsPlayedMtation>(
    MARK_EPISODE_AS_PLAYED_MUTATION,
  );

  const [
    toggleSubscribeMutation,
    { data: subscribeData, loading: subscribeLoading },
  ] = ToggleSubscribe();

  const toggleSubscribe = () => {
    toggleSubscribeMutation({
      variables: {
        input: {
          podcastId: +id,
        },
      },
    });
    if (subscribeData?.toggleSubscribe.ok) {
      setSubscribe(!subscribe);
    }
  };

  const onSubmit = () => {
    createReviewMutation({
      variables: {
        input: {
          title,
          text,
          rating: star,
          podcastId: +id,
        },
      },
    });
  };

  return (
    <div>
      <Helmet>
        <title>Podcast Detail | Podcast</title>
      </Helmet>
      <div
        className={`container mt-10 ${
          meData?.me.role === UserRole.Listener && "mb-72"
        }`}
      >
        <div className="flex">
          <div
            style={{
              backgroundImage: `url(${data?.getPodcast.podcast?.thumbnailUrl})`,
            }}
            className="w-2/5 h-96 bg-cover bg-center rounded-l-lg"
          ></div>
          <section className="w-full p-5 bg-gray-100 bg-opacity-40 rounded-r-lg text-gray-900">
            <header className="flex justify-between">
              <div>
                <h1 className="text-4xl pr-2 font-black">
                  {data?.getPodcast.podcast?.title}
                </h1>
                <h3 className="mt-1 text-indigo-900 font-semibold">
                  {data?.getPodcast.podcast?.creator.email}
                </h3>
              </div>
            </header>
            <div>
              <span className="block text-indigo-900 mt-3 font-bold">
                {data?.getPodcast.podcast?.category &&
                  data?.getPodcast.podcast?.category.name.toUpperCase()}
              </span>
              <div className="w-1/5 flex items-center text-xl my-4">
                {meData?.me.role === UserRole.Host ? (
                  <>
                    <Link to={`/edit-podcast/${id}`}>
                      <FontAwesomeIcon
                        className="mr-5 text-blue-800 hover:text-blue-600 transition duration-150"
                        icon={faEdit}
                      />
                    </Link>
                    <FontAwesomeIcon
                      onClick={deletePodcast}
                      className="text-blue-800 hover:text-blue-600 transition duration-150"
                      icon={faEraser}
                    />
                  </>
                ) : (
                  <div
                    onClick={toggleSubscribe}
                    className="w-1/5 flex items-center pt-2 mt-2 text-blue-800 hover:text-blue-600 cursor-pointer transition duration-150"
                  >
                    <span className="mr-3 font-bold text-xl">Subscribe</span>
                    <FontAwesomeIcon
                      className={`text-2xl ${
                        subscribeLoading && "animate-spin"
                      }`}
                      icon={subscribe ? faBell : faPlusCircle}
                    />
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-700 mt-4 text-md">
              {data?.getPodcast.podcast?.description}
            </p>
          </section>
        </div>
        <h4 className="font-black text-2xl mt-5 pl-8">
          Listeners : {data?.getPodcast.podcast?.listeners.length}
        </h4>
        <div className="flex mt-8">
          <div className="w-2/5 px-8 py-2">
            <span className="font-bold text-xl mb-5">
              Reviews : {data?.getPodcast.podcast?.reviews.length}
            </span>
            <ul>
              {data?.getPodcast.podcast?.reviews.map((review: any) => (
                <li key={review.id} className="my-5 py-1 px-5">
                  <h2 className="font-semibold text-lg">{review.title}</h2>
                  <h4 className="text-sm">{review.creator.email}</h4>
                  <p>{review.text}</p>
                  <div className="flex items-center text-sm">
                    <FontAwesomeIcon
                      className={`${
                        review.rating >= 1 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${
                        review.rating >= 2 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${
                        review.rating >= 3 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${
                        review.rating >= 4 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${
                        review.rating === 5
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                    />
                    <h6 className="ml-3 text-gray-400">
                      {new Date(Date.parse(review.updatedAt)).toLocaleString()}
                    </h6>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/5 border-l-2 border-gray-200 px-8 py-2">
            <div className="flex justify-between">
              <span className="font-bold text-xl">
                Episodes : {data?.getPodcast.podcast?.episodes.length}
              </span>
              <div>
                {meData?.me.role === UserRole.Host && (
                  <Link to={`/podcast/${id}/upload-episode`}>
                    Create Episode
                    <FontAwesomeIcon
                      className="ml-3 text-blue-800 hover:text-blue-600 transition duration-150"
                      icon={faPlusCircle}
                    />
                  </Link>
                )}
              </div>
            </div>
            <ul>
              {data?.getPodcast.podcast?.episodes?.map((episode: any) => (
                <li key={episode.id} className="py-4 px-5">
                  <div className="flex items-center">
                    <h2 className="text-lg font-semibold">{episode.title}</h2>
                    {meData?.me.role === UserRole.Listener && (
                      <FontAwesomeIcon
                        onClick={() => playEpisode(episode.id)}
                        className="ml-3 cursor-pointer text-blue-800 hover:text-blue-600 transition duration-150"
                        icon={faPlay}
                      />
                    )}
                  </div>
                  <p className="text-sm">{episode.description}</p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 text-sm">
                      {new Date(Date.parse(episode.createdAt)).toLocaleString()}
                    </span>
                    {meData?.me.role === UserRole.Host && (
                      <>
                        <Link to={`/podcast/${id}/edit-episode/${episode.id}`}>
                          <FontAwesomeIcon
                            className="mx-5 text-blue-800 hover:text-blue-600 transition duration-150"
                            icon={faEdit}
                          />
                        </Link>
                        <FontAwesomeIcon
                          onClick={() => deleteEpisode(episode.id)}
                          className="text-blue-800 hover:text-blue-600 transition duration-150"
                          icon={faEraser}
                        />
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {meData?.me.role === UserRole.Listener && (
            <div className="w-2/3 rounded-t-lg fixed bottom-0 text-center py-7 text-gray-800 bg-gray-100 m-auto">
              <h3 className="font-black text-2xl">Review</h3>
              <form
                className="flex flex-col px-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex justify-center items-center">
                  <input
                    ref={register({ required: "Title is required" })}
                    className="input bg-white mr-3 my-3 w-1/3"
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  <div>
                    <span className="font-bold">Rating : </span>
                    <FontAwesomeIcon
                      className={`${
                        star >= 1 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                      onClick={() => setStar(1)}
                    />
                    <FontAwesomeIcon
                      className={`${
                        star >= 2 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                      onClick={() => setStar(2)}
                    />
                    <FontAwesomeIcon
                      className={`${
                        star >= 3 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                      onClick={() => setStar(3)}
                    />
                    <FontAwesomeIcon
                      className={`${
                        star >= 4 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                      onClick={() => setStar(4)}
                    />
                    <FontAwesomeIcon
                      className={`${
                        star === 5 ? "text-yellow-400" : "text-gray-400"
                      } cursor-pointer`}
                      icon={faStar}
                      onClick={() => setStar(5)}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center">
                  <input
                    ref={register({ required: "Text is required" })}
                    className="input bg-white w-10/12 mr-3"
                    type="text"
                    name="text"
                    placeholder="Text"
                  />
                  <ReviewButton
                    loading={reviewLoading}
                    canClick={formState.isValid}
                    actionText="Send"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
