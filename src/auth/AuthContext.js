import { createContext, useContext, useState } from "react";
import axios from "axios";
const ghClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const ghAuthUrl = process.env.REACT_APP_AUTH_API_URL;
const osdAuthUrl = "";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState({
    user: {},
    userButtonUrl,
    login,
  });

  const saveTokenToLocalStorage = (user_access_token) => {
    localStorage.setItem("user_access_token", user_access_token);
  };

  function userButtonUrl() {
    // Check local storage for user token, if present then use a different URL for our own auth which already has the github token
    if (userState.user.github_username) {
      return "#";
    } else if (localStorage.getItem("osd_user_token")) {
      return "";
    } else {
      return `https://github.com/login/oauth/authorize?client_id=${ghClientId}`;
    }
  }

  async function login(ghUserCode, osdUserToken) {
    // check for osdUserToken or ghUserCode and route to appropriate login API
    let userResponse;
    let newUser;

    if (ghUserCode) {
      userResponse = await ghLogin(ghUserCode);
      console.log("received ghUserCode");
    } else if (osdUserToken) {
      userResponse = await osdLogin(osdUserToken);
      console.log("received osdUserToken");
    }

    // on successful login, create a user object
    if (userResponse) {
      if (userResponse.status === 200 && userResponse.data) {
        newUser = {
          user: userResponse.data,
        };
        saveTokenToLocalStorage(userResponse.data.token);
      }
    }

    // on success, set the user object in userState
    if (userResponse && newUser) {
      console.log("newUser and access_token from the server: ", newUser);
      setUserState((prevState) => ({
        ...prevState,
        ...newUser,
      }));
    }
  }

  async function ghLogin(ghUserCode) {
    try {
      const response = await axios.get(`${ghAuthUrl}?code=${ghUserCode}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function osdLogin(osdUserToken) {
    try {
      const response = await axios.get(`${osdAuthUrl}?token=${osdUserToken}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
};