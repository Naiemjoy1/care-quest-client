import { Link } from "react-router-dom";

const PopularTest = ({ popular }) => {
  return (
    <div>
      <div className="card card-compact bg-base-100 border h-[450px]">
        <figure>
          <img src={popular.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{popular.name}</h2>
          <p>{popular.description}</p>
          <div className="card-actions justify-end">
            <Link to={`/tests/${popular._id}`}>
              <button className="btn btn-primary text-white">
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
