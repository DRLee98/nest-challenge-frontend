import { gql, useQuery } from "@apollo/client";
import {
  faCaretLeft,
  faCaretRight,
  faClone,
  faList,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Podcasts, ViewMode } from "../../components/podcasts";
import { VIEW_MODE } from "../../constants";
import { My_PODCAST_FRAGMENT } from "../../fragment";
import { myPodcastQuery } from "../../__generated__/myPodcastQuery";

export const MY_PODCAST_QUERY = gql`
  query myPodcastQuery {
    me {
      id
      email
      role
      podcasts {
        ...MyPodcastParts
      }
    }
  }
  ${My_PODCAST_FRAGMENT}
`;

export const GetMyPodcasts = () => {
  const { data, loading } = useQuery<myPodcastQuery>(MY_PODCAST_QUERY);
  const [viewMode, setViewMode] = useState<ViewMode | string>(
    localStorage.getItem(VIEW_MODE) || ViewMode.List,
  );
  const [target, setTarget] = useState(0);
  const podcasts = data?.me.podcasts;
  return (
    <div>
      <Helmet>
        <title>My Podcast | Podcast</title>
      </Helmet>
      <div className="container">
        <div className="flex justify-center my-10">
          <Link
            className="text-2xl font-black px-8 py-2 text-blue-900 rounded-lg hover:text-blue-400 hover:bg-yellow-100 bg-opacity-80 transition duration-200"
            to="/create-podcast"
          >
            Create Podcast! &rarr;
          </Link>
        </div>
        <section className="w-full overflow-hidden">
          <div className="text-right text-2xl text-blue-900 mb-5">
            <button
              className="viewMode"
              onClick={() => {
                localStorage.setItem(VIEW_MODE, ViewMode.List);
                setViewMode(ViewMode.List);
              }}
            >
              <FontAwesomeIcon icon={faList} />
            </button>
            <button
              className="viewMode mx-3"
              onClick={() => {
                localStorage.setItem(VIEW_MODE, ViewMode.Block);
                setViewMode(ViewMode.Block);
              }}
            >
              <FontAwesomeIcon icon={faTh} />
            </button>
            <button
              className="viewMode"
              onClick={() => {
                localStorage.setItem(VIEW_MODE, ViewMode.Card);
                setViewMode(ViewMode.Card);
              }}
            >
              <FontAwesomeIcon icon={faClone} />
            </button>
          </div>
          <div
            className={`${
              viewMode === ViewMode.Block
                ? "grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-x-3 gap-y-8"
                : viewMode === ViewMode.Card && "flex"
            }`}
          >
            {podcasts && podcasts.length > 0 ? (
              podcasts.map((podcast, i) => (
                <Podcasts
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  email={""}
                  description={podcast.description}
                  thumbnailUrl={podcast.thumbnailUrl}
                  updatedAt={podcast.updatedAt}
                  viewMode={viewMode}
                  target={target}
                  index={i}
                  length={podcasts.length - 1}
                />
              ))
            ) : (
              <div className="w-80 h-80 m-auto flex flex-col justify-center items-center">
                <h4 className="text-xl mb-5">You have no podcasts.</h4>
                <Link to="/create-podcast">Create Podcast! &rarr;</Link>
              </div>
            )}
          </div>
        </section>
        {viewMode === ViewMode.Card && (
          <>
            <button
              onClick={() =>
                setTarget(
                  podcasts && target - 1 < 0 ? podcasts.length - 1 : target - 1,
                )
              }
              className="py-1 px-2 absolute left-32 top-1/2 text-4xl buttom"
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <button
              onClick={() =>
                setTarget(
                  podcasts && target + 1 > podcasts.length - 1 ? 0 : target + 1,
                )
              }
              className="py-1 px-2 absolute right-32 top-1/2 text-4xl buttom"
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
