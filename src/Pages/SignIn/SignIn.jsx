import { Link, useLocation, useNavigate } from "react-router-dom";
import signin from "../../assets/signin.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAuth from "../../Components/Hooks/useAuth";

const SignIn = () => {
  const { user } = useAuth();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user && user.token) {
        try {
          const response = await axiosSecure.get(`/users/admin/${user.email}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setAdmin(response.data.admin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
        }
      }
    };

    const fetchLoginStatus = async () => {
      if (user && user.token) {
        try {
          const response = await axiosSecure.get(
            `/users/status/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setLoginStatus(response.data.status);
        } catch (error) {
          console.error("Error fetching status:", error);
        }
      }
    };

    fetchAdminStatus();
    fetchLoginStatus();
  }, [user, axiosSecure]);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await signIn(email, password);
      const user = result.user;

      // Perform any necessary data loading after login here

      // Navigate based on isAdmin status after the data loading is complete
      if (admin) {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Login failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false); // Set loading back to false after login request completes
    }
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="flex gap-4 justify-center items-center container mx-auto my-10">
      <div className="w-1/2">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              onBlur={handleValidateCaptcha}
              type="text"
              name="captcha"
              placeholder="type the captcha above"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary text-white"
              disabled={disabled || loading} // Disable button if captcha is not valid or loading is true
            >
              {loading ? "Logging in..." : "Login"}{" "}
              {/* Show loading text if loading */}
            </button>
          </div>
          <p className="mt-5 text-center">
            New Here?{" "}
            <Link to="/signup" className="text-primary">
              SignUp
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
      <div>
        <img src={signin} alt="" />
      </div>
    </div>
  );
};

export default SignIn;
