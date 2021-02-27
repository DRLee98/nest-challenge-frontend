import React from "react";
import { Link } from "react-router-dom";

export enum ViewMode {
  List = "List",
  Card = "Card",
  Block = "Block",
}

interface IPodcastProps {
  id: number;
  title: string;
  email: string;
  description: string;
  thumbnailUrl: string;
  updatedAt: string;
  viewMode: ViewMode | string;
  target: number;
  index: number;
  length: number;
}

export const Podcasts: React.FC<IPodcastProps> = ({
  id,
  title,
  email,
  description,
  thumbnailUrl,
  updatedAt,
  viewMode,
  target,
  index,
  length,
}) => {
  const nextTarget = (target: number) => {
    if (target + 1 > length) {
      return 0;
    }
    return target + 1;
  };
  const prevTarget = (target: number) => {
    if (target - 1 < 0) {
      return length;
    }
    return target - 1;
  };
  return viewMode === ViewMode.List ? (
    <div className="py-4 px-5 hover:bg-yellow-50">
      <Link role="link" to={`/podcast/${id}`}>
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
            }}
            className="w-24 h-24 bg-cover bg-center rounded-md"
          ></div>
          <div className="ml-4 text-left">
            <h3 className="text-2xl font-black">{title}</h3>
            <h5 className="text-sm my-2">{email}</h5>
            <h6 className="text-xs text-gray-500 mb-1">
              UpdatedAt : {new Date(Date.parse(updatedAt)).toLocaleString()}
            </h6>
            <p className="text-sm text-gray-400">
              {description.length > 120
                ? `${description.slice(0, 120)}...`
                : description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  ) : viewMode === ViewMode.Block ? (
    <div className="p-3 group hover:bg-yellow-100 rounded-lg transition duration-200">
      <Link role="link" to={`/podcast/${id}`}>
        <div
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          className="w-52 h-52 bg-cover bg-center rounded-md m-auto group-hover:rotate-y-180"
        >
          <div className="w-full h-full rounded-md p-2 opacity-0 group-hover:bg-gray-900 group-hover:opacity-100 group-hover:bg-opacity-70 transition duration-200">
            <h3 className="font-bold text-gray-200">
              {title.length > 24 ? `${title.slice(0, 24)}...` : title}
            </h3>
            <p className="font-light text-sm text-gray-400">
              {description.length > 120
                ? `${description.slice(0, 120)}...`
                : description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  ) : viewMode === ViewMode.Card && target === index ? (
    <div className="border-4 border-yellow-200 w-96 h-card p-3 group hover:bg-yellow-100 bg-opacity-80 rounded-lg transition duration-200 transform scale-110 -translate-x-1/2 absolute left-1/2 inset-y-1/4 z-50">
      <Link role="link" to={`/podcast/${id}`}>
        <div
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          className="w-full h-full bg-cover bg-center rounded-md text-center overflow-hidden"
        >
          <div className="w-full h-full opacity-0 p-4 group-hover:opacity-100 group-hover:bg-gray-900 group-hover:bg-opacity-70 flex flex-col justify-center">
            <h3 className="font-bold text-lightBlue-300 text-2xl">{title}</h3>
            <h5 className="font-semibold text-lightBlue-100 my-4">{email}</h5>
            <h5 className="font-semibold text-gray-100">
              {updatedAt.slice(0, 10)}
            </h5>
            <p className="w-full font-light text-gray-50 mt-5">
              {description.length > 320
                ? `${description.slice(0, 320)}...`
                : description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  ) : nextTarget(target) === index ? (
    <div className="border-4 border-yellow-200 w-96 h-card p-3 rounded-lg transition duration-200 absolute left-1/2 z-40">
      <Link role="link" to={`/podcast/${id}`}>
        <div
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          className="w-full h-full bg-cover bg-center rounded-md"
        ></div>
      </Link>
    </div>
  ) : nextTarget(target + 1 > length ? 0 : target + 1) === index ? (
    <div className="border-4 border-yellow-200 w-96 h-card p-3 rounded-lg transition duration-200 absolute left-1/4 transform scale-90">
      <Link role="link" to={`/podcast/${id}`}>
        <div
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          className="w-full h-full bg-cover bg-center rounded-md"
        ></div>
      </Link>
    </div>
  ) : prevTarget(target) === index ? (
    <div className="border-4 border-yellow-200 w-96 h-card p-3 rounded-lg transition duration-200 absolute right-1/2 z-40">
      <Link role="link" to={`/podcast/${id}`}>
        <div
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          className="w-full h-full bg-cover bg-center rounded-md"
        ></div>
      </Link>
    </div>
  ) : prevTarget(target - 1 < 0 ? length : target - 1) === index ? (
    <div className="border-4 border-yellow-200 w-96 h-card p-3 rounded-lg transition duration-200 absolute right-1/4 transform scale-90">
      <Link role="link" to={`/podcast/${id}`}>
        <div
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          className="w-full h-full bg-cover bg-center rounded-md"
        ></div>
      </Link>
    </div>
  ) : (
    <></>
  );
};
