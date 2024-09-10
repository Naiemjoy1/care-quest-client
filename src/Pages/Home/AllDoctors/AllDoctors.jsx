import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useDoctors from "../../../Components/Hooks/useDoctors";
import { useState, useEffect } from "react";
import DoctorsTabs from "./DoctorsTabs";

const AllDoctors = () => {
  const [doctors] = useDoctors();

  const [tabIndex, setTabIndex] = useState(0);
  const [specializations, setSpecializations] = useState([]);

  // Extract unique specializations from doctors data
  useEffect(() => {
    if (doctors.length > 0) {
      const uniqueSpecializations = [
        "All",
        ...new Set(doctors.map((doctor) => doctor.specialization)),
      ];
      setSpecializations(uniqueSpecializations);
    }
  }, [doctors]);

  // Filter doctors based on selected tab (specialization)
  const getFilteredDoctors = (specialization) => {
    if (specialization === "All") {
      return doctors;
    }
    return doctors.filter((doctor) => doctor.specialization === specialization);
  };

  return (
    <div className="px-5">
      <section>
        <div className="lg:w-1/2 text-center mx-auto my-16 space-y-4">
          <p className="text-lg text-primary font-bold">Our team</p>
          <p className="text-5xl text-secondary font-semibold">
            Meet our doctors
          </p>
          <p>
            Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
            purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
            aliquam odio, ut consectetur enim.
          </p>
        </div>
      </section>
      <div className="container mx-auto mb-12">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            {specializations.map((specialization, index) => (
              <Tab key={index}>{specialization}</Tab>
            ))}
          </TabList>

          {specializations.map((specialization, index) => (
            <TabPanel key={index}>
              <DoctorsTabs doctors={getFilteredDoctors(specialization)} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AllDoctors;
