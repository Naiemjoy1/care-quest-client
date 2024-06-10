import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const Doctors = () => {
  const axiosPublic = useAxiosPublic();
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/doctors");
      return res.data;
    },
  });

  // console.log("doctors", doctors);

  return (
    <div className="my-14 grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-4 container mx-auto">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="flex flex-col justify-center  p-6 shadow-md rounded-xl sm:px-12 bg-primary text-gray-100"
        >
          <img
            src={doctor.image}
            alt=""
            className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {doctor.name}
              </h2>
              <p className="text-xs sm:text-base text-white">
                {doctor.specialization}
              </p>
            </div>
            <div className="flex flex-col pt-2 space-y-1 text-center">
              <p>{doctor.contact.email}</p>
              <p>{doctor.contact.phone}</p>
              <p>{doctor.contact.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
