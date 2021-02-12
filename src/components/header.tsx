import {
  faBell,
  faPodcast,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

interface IFormProps {
  term: string;
}

export const Header: React.FC = () => {
  const { data } = useMe();
  const history = useHistory();
  const { register, getValues, handleSubmit } = useForm();
  const onClick = () => {
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };
  const onSubmit = () => {
    const { term } = getValues();
    history.push(`/search-podcast/${term}`);
  };
  return (
    <header className="py-3 text-2xl text-blue-50 bg-blue-400 border-b-4 border-blue-200 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faPodcast} className=" text-2xl" />
          <span className="ml-2 font-black">Awesome Podcast</span>
        </Link>
        {data?.me.role === UserRole.Listener && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              ref={register()}
              className="searchInput"
              name="term"
              type="text"
              placeholder="Search"
            />
          </form>
        )}

        <div>
          {data?.me.role === UserRole.Listener && (
            <Link to="/see-me" className="mr-4">
              <FontAwesomeIcon icon={faBell} />
            </Link>
          )}
          {data?.me.email && (
            <Link to="/edit-profile/" className="mr-4">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
          {data?.me.email && (
            <button onClick={onClick}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
