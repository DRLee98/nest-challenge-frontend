import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center text-blue-900 bg-white px-5">
    <Helmet>
      <title>Not found | Podcast</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
    <h4 className="font-medium text-base mb-5">
      The page you're looking for does not exist or has moved.
    </h4>
    <Link to="/" className="hover:underline text-blue-600">
      Go back home &rarr;
    </Link>
  </div>
);
