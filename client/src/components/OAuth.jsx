import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../features/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const response = await signInWithPopup(auth, provider);
      console.log("got the resp from google", response);
      const res = await fetch(
        "https://plotpe-mern-project.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: response.user.displayName,
            email: response.user.email,
            photo: response.user.photoURL,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Error in server communication", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue With Google
    </button>
  );
}
