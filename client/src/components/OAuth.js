
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../api/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginGoogle } from "../redux-toolkit/authSlice";
import GoogleIcon from "../Images/google.svg";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const resultsFromGoogle = await signInWithPopup(auth, provider);
    const body = {
      name: resultsFromGoogle.user.displayName,
      email: resultsFromGoogle.user.email,
      googlePhotoUrl: resultsFromGoogle.user.photoURL,
    };
    dispatch(loginGoogle(body)).then(() => {
      navigate("/");
    });
  };
  return (
    <div
      onClick={handleGoogleClick}
      className="relative flex h-12 w-full items-center border rounded-xl py-2 cursor-pointer  bg-gradient-to-r from-slate-50 to-white hover:drop-shadow-md"
    >
      <img className="absolute h-[70%] pl-4 z-10" src={GoogleIcon} alt=""></img>
      <div className="w-full text-center text-lg opacity-70">
        Tiếp tục với google
      </div>
    </div>
  );
}
