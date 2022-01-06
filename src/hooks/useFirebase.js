import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import toastCreator from "./toastifyCreator";

initializeAuthentication();

const useFirebase = () => {
  //All state
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("https://guarded-hamlet-19613.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => window.location.reload());
  };
  //Sign in provider
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  //Google sign in
  const signInUsingGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //Facebook sign in
  const signInUsingFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  //Update user
  const updateUser = (name, image) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    }).catch((error) => {
      setError(error.message);
    });
  };
  //Register user
  const registerUser = (name, email, password, image) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        saveUser(email, name, "POST");
        updateUser(name, image);
      })
      .catch((error) => {
        setError(error.message);
        if (error.message.includes("email-already-in-use")) {
          toastCreator("Email already exists!", "error");
        } else {
          toastCreator("Something went wrong!", "error");
        }
      });
  };
  //Login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Logout functionality
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
        toastCreator("Something went wrong!", "error");
      });
  };

  useEffect(() => {
    fetch(`https://guarded-hamlet-19613.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return {
    user,
    setUser,
    admin,
    error,
    loading,
    signInUsingGoogle,
    signInUsingFacebook,
    registerUser,
    loginUser,
    saveUser,
    logout,
  };
};

export default useFirebase;
