const PopularTest = ({ item }) => {
  const { _id, name, image, description, price, date, slots, category } = item;
  return (
    <div>
      <div className="card card-compact bg-base-100 border h-[450px]">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary text-white">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularTest;
