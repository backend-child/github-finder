import React from "react";
import UsersSearch from "../components/users/UsersSearch";

import UserResults from "../components/users/UserResults";

const Home = () => {
  return (
    <>
      <UsersSearch />
      <UserResults />
    </>
  );
};

export default Home;
