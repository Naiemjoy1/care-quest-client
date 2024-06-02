import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
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
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white">Login</button>
        </div>
        <p>
          New here?{" "}
          <Link to="/signup" className=" text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
