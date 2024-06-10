const AboutClinic = () => {
  return (
    <div className="mt-10 container mx-auto px-4 grid grid-cols-1 lg:flex gap-10">
      <div className=" lg:w-1/2 space-y-4">
        <h2 className=" text-primary text-xl font-semibold">About clinic</h2>
        <p className="text-6xl font-bold text-secondary">
          Why patients choose our center
        </p>
        <p>
          Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
          purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
          aliquam odio, ut consectetur enim. Ut sit amet iaculis nulla, sed
          dapibus justo. Nullam quis placerat massa, vitae ullamcorper nulla.
        </p>
        <button className="btn btn-primary text-secondary">Read More</button>
      </div>
      <div className="lg:w-1/2 space-y-4">
        <h2 className=" text-primary text-xl font-semibold">Clinic skills</h2>
        <p className="text-4xl font-bold text-secondary">Our specialisations</p>
        <div className="flex justify-between px-5">
          <div
            className="radial-progress text-primary"
            style={{ "--value": 85, "--size": "6rem", "--thickness": "10px" }}
            role="progressbar"
          >
            85%
          </div>
          <div
            className="radial-progress text-primary"
            style={{ "--value": 68, "--size": "6rem", "--thickness": "10px" }}
            role="progressbar"
          >
            68%
          </div>
          <div
            className="radial-progress text-primary"
            style={{ "--value": 79, "--size": "6rem", "--thickness": "10px" }}
            role="progressbar"
          >
            79%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutClinic;
