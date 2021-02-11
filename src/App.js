import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
// Pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import LandingPage from "./pages/LandingPage/LandingPage";
// Config
import firebaseConfig from "./config/firebase.config";

firebase.initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (
      window.sessionStorage.getItem("auth_data") ||
      window.localStorage.getItem("auth_data")
    ) {
      loginHandler();
    } else {
      let loader = document.getElementById("loading-spinner");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    }
  }, []);

  const loginHandler = () => {
    let localData = window.localStorage.getItem("auth_data");
    if (!localData) localData = window.sessionStorage.getItem("auth_data");
    localData = JSON.parse(localData);

    firebase
      .auth()
      .signInWithEmailAndPassword(localData.email, localData.password)
      .then(() => {
        setIsLoggedIn(true);
        let loader = document.getElementById("loading-spinner");
        if (loader) {
          loader.style.opacity = "0";
          setTimeout(() => {
            loader.remove();
          }, 500);
        }
      });
  };

  let route;
  if (isLoggedIn) {
    route = <LandingPage setIsLoggedIn={setIsLoggedIn} />;
  } else {
    route = (
      <Switch>
        <Route
          path="/login"
          exact
          render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          exact
          render={() => <Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Redirect path="*" to="login" />
      </Switch>
    );
  }
  return route;
}

export default App;
