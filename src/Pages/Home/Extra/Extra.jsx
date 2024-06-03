import { FaStethoscope } from "react-icons/fa";

const Extra = () => {
  return (
    <div className="bg-primary p-12">
      <div className="flex justify-between items-center container mx-auto ">
        <div className="w-1/2 flex justify-center items-center gap-5">
          <FaStethoscope className=" text-8xl text-secondary" />
          <div>
            <p className=" text-secondary text-xl font-semibold">
              Special offer
            </p>
            <p className="text-white text-4xl font-bold">
              Get a free medical <br /> checkup
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <label className="input input-bordered flex items-center gap-2 rounded-full">
            <input
              type="text"
              className="grow"
              placeholder="Enter your phone number"
            />
            <span className="  text-white btn btn-secondary rounded-full">
              Send Request
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Extra;
