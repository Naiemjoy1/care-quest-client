import { Link } from "react-router-dom";

const AllTest = ({ test }) => {
  const { _id, image, date, slots, name, description } = test;

  return (
    <div>
      <div className="card card-compact bg-base-100 border h-[450px]">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <p>Date: {date}</p>
          <p>Slots: {slots.join(", ")} </p>
          <div className="card-actions justify-end">
            <Link to={`/tests/${_id}`}>
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

export default AllTest;
