import { Link } from "react-router-dom";
import errimg from "../../assets/Error.png";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={errimg} alt="Error" className="mb-2 h-[550px]" />
      <Link to="/">
        <button className="btn btn-primary text-white">Back Home</button>
      </Link>
    </div>
  );
};

export default Error;
