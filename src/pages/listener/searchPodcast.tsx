import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Podcasts, ViewMode } from "../../components/podcasts";
import { PODCAST_FRAGMENT } from "../../fragment";
import { searchPodcastsQuery } from "../../__generated__/searchPodcastsQuery";
import {
  faCaretLeft,
  faCaretRight,
  faClone,
  faList,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { VIEW_MODE } from "../../constants";

const SEARCH_PODCASTS_QUERY = gql`
  query searchPodcastsQuery($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
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

interface IParam {
  term: string;
}

export const SearchPodcast = () => {
  const { term } = useParams<IParam>();
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode | string>(
    localStorage.getItem(VIEW_MODE) || ViewMode.List,
  );
  const [target, setTarget] = useState(0);
  const { data, loading } = useQuery<searchPodcastsQuery>(
    SEARCH_PODCASTS_QUERY,
    { variables: { input: { page, titleQuery: term } } },
  );
  const podcasts = data?.searchPodcasts.podcasts;

  return (
    <div>
      <Helmet>
        <title>My Podcast | Podcast</title>
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
