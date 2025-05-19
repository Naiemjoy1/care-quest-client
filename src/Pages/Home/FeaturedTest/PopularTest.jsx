import { Link } from "react-router-dom";

const PopularTest = ({ popular }) => {
  return (
    <div>
      <div className="card card-compact bg-base-100 border h-[380px]">
        <figure>
          <img
            src={popular.image}
            alt={popular.name}
            className="w-full h-[200px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{popular.name}</h2>
          <p>{popular.description}</p>
          <div className="card-actions justify-end">
            <Link to={`/tests/${popular._id}`}>
              <button className="btn btn-primary text-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularTest;
