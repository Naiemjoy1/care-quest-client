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

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [disabled, setDisabled] = useState(true);
  const axiosSecure = useAxiosSecure();

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;
      console.log(user);

      // Fetch user role
      const response = await axiosSecure.get(`/users/status/${user.email}`);
      const userRole = response.data.role;
      console.log("in login res", response);
      console.log("in login role", userRole);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate based on user role
      const defaultPath =
        userRole === "admin" ? "/dashboard/admin" : "/dashboard/user";
      const from = location.state?.from?.pathname || defaultPath;
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
            {/* <input
              onBlur={handleValidateCaptcha}
              type="text"
              name="captcha"
              placeholder="type the captcha above"
              className="input input-bordered"
              required
            /> */}
            {/* disabled={disabled} */}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Login</button>
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
