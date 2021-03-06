import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllPodcastsQuery } from "../../__generated__/getAllPodcastsQuery";
import { PODCAST_FRAGMENT } from "../../fragment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faClone,
  faList,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import { Podcasts, ViewMode } from "../../components/podcasts";
import { VIEW_MODE } from "../../constants";

export const PODCASTS_QUERY = gql`
  query getAllPodcastsQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
    allCategories {
      ok
      error
      categories {
        slug
        name
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const GetAllPodcasts = () => {
  const { data } = useQuery<getAllPodcastsQuery>(PODCASTS_QUERY);
  const podcastsArray = data?.getAllPodcasts.podcasts;
  const [viewMode, setViewMode] = useState<ViewMode | string>(
    localStorage.getItem(VIEW_MODE) || ViewMode.List,
  );
  const [target, setTarget] = useState(0);
  return (
    <div>
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <div className="container">
        <div className="flex flex-row justify-evenly my-10">
          {data?.allCategories.categories?.map((category) => (
            <Link
              className="text-xl font-black px-8 py-2 text-blue-900 rounded-lg hover:text-blue-400 hover:bg-yellow-100 bg-opacity-80 transition duration-200"
              to={`/category/${category.slug}`}
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
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
            {podcastsArray &&
              podcastsArray.map((podcast, i) => (
                <Podcasts
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  email={podcast?.creator.email}
                  description={podcast.description}
                  thumbnailUrl={podcast.thumbnailUrl}
                  updatedAt={podcast.updatedAt}
                  viewMode={viewMode}
                  target={target}
                  index={i}
                  length={podcastsArray.length - 1}
                />
              ))}
          </div>
        </section>
        {viewMode === ViewMode.Card && (
          <>
            <button
              onClick={() =>
                setTarget(
                  podcastsArray && target - 1 < 0
                    ? podcastsArray.length - 1
                    : target - 1,
                )
              }
              className="py-1 px-2 absolute left-32 top-1/2 text-4xl buttom"
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <button
              onClick={() =>
                setTarget(
                  podcastsArray && target + 1 > podcastsArray.length - 1
                    ? 0
                    : target + 1,
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
