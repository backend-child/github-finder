import React from "react";
import { createContext, useReducer } from "react";

import githubReducer from "./GitHubReducer";

const GithubContext = createContext();

const gitHuburl = `https://api.github.com/search/users?`;

const gitHuburl2 = `https://api.github.com/users`;

const gitHubtoken = `token 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`;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${gitHuburl}${params}`, {
      headers: {
        Authorization: `${gitHubtoken}`,
      },
    });

    const { items } = await response.json();
    console.log(items);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get single user to display
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${gitHuburl2}/${login}`, {
      headers: {
        Authorization: `${gitHubtoken}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //set loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  //clear user from state
  const clearUsers = () =>
    dispatch({
      type: "CLEAR_USERS",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
