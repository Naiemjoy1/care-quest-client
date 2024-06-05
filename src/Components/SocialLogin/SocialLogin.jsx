import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        // Optionally, show an alert to the user
        alert("Failed to sign in with Google. Please try again.");
      });
  };

  return (
    <div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-primary text-white"
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
