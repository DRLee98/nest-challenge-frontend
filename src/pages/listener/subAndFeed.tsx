import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { subAndFeedQuery } from "../../__generated__/subAndFeedQuery";

export const SUB_AND_FEED_QUERY = gql`
  query subAndFeedQuery {
    me {
      id
      email
      role
      subsriptions {
        id
        createdAt
        updatedAt
        title
        description
        thumbnailUrl
        rating
        category {
          name
        }
      }
      playedEpisodes {
        id
        createdAt
        updatedAt
        title
        description
      }
    }
  }
`;

export const SubAndFeed = () => {
  const { data } = useQuery<subAndFeedQuery>(SUB_AND_FEED_QUERY);
  return (
    <div>
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <div className="container flex">
        <div className="w-1/3 p-8">
          <div className="font-bold text-2xl">Watched Episode</div>
          <ul>
            {data?.me.playedEpisodes && data?.me.playedEpisodes.length > 0 ? (
              data?.me.playedEpisodes?.map((episode: any) => (
                <li key={episode.id} className="py-4 px-5">
                  <h2 className="text-lg font-semibold">{episode.title}</h2>
                  <p className="text-sm">{episode.description}</p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 text-sm">
                      {new Date(Date.parse(episode.createdAt)).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <div className="font-bold text-3xl text-center my-96">
                No Episode
              </div>
            )}
          </ul>
        </div>
        <div className="w-2/3 p-8 border-l-2 border-gray-200">
          <div className="font-bold text-2xl">Subscribe</div>
          {data?.me.subsriptions && data?.me.subsriptions.length > 0 ? (
            data?.me.subsriptions.map((sub: any) => (
              <div className="py-4 px-5 hover:bg-yellow-50">
                <Link role="link" to={`/podcast/${sub.id}`}>
                  <div className="flex items-center">
                    <div
                      style={{
                        backgroundImage: `url(${sub.thumbnailUrl})`,
                      }}
                      className="w-24 h-24 bg-cover bg-center rounded-md"
                    ></div>
                    <div className="ml-4 text-left">
                      <h3 className="text-2xl font-black">{sub.title}</h3>
                      <h6 className="text-xs text-gray-500 mb-1">
                        UpdatedAt :{" "}
                        {new Date(Date.parse(sub.updatedAt)).toLocaleString()}
                      </h6>
                      <p className="text-sm text-gray-400">
                        {sub.description.length > 120
                          ? `${sub.description.slice(0, 120)}...`
                          : sub.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="font-bold text-3xl text-center my-96">
              No Subscribe
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
