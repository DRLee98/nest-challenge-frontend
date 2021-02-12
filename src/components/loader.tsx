import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <FontAwesomeIcon
      className="animate-spin w-96 h-96 text-blue-600 text-9xl"
      icon={faCircleNotch}
    />
  );
};
