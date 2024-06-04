import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import useDoctors from "../../../Components/Hooks/useDoctors";
import { useState } from "react";
import DoctorsTabs from "./DoctorsTabs";

const AllDoctors = () => {
  const [doctors] = useDoctors();
  const [tabIndex, setTabIndex] = useState(0);
  const Cardiologist = doctors.filter(
    (doctor) => doctor.specialization === "Cardiologist"
  );
  const Endocrinologist = doctors.filter(
    (doctor) => doctor.specialization === "Endocrinologist"
  );
  const Urologist = doctors.filter(
    (doctor) => doctor.specialization === "Urologist"
  );
  const Neurologist = doctors.filter(
    (doctor) => doctor.specialization === "Neurologist"
  );
  const Orthopedic = doctors.filter(
    (doctor) => doctor.specialization === "Orthopedic"
  );
  const Dermatologist = doctors.filter(
    (doctor) => doctor.specialization === "Dermatologist"
  );

  return (
    <div>
      <section>
        <div className="w-1/2 text-center mx-auto my-16 space-y-4">
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
      <div className="container mx-auto mb-12 ">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Cardiologist</Tab>
            <Tab>Endocrinologist</Tab>
            <Tab>Urologist</Tab>
            <Tab>Neurologist</Tab>
            <Tab>Orthopedic</Tab>
            <Tab>Dermatologist</Tab>
          </TabList>
          <TabPanel>
            <DoctorsTabs doctors={doctors}></DoctorsTabs>
          </TabPanel>
          <TabPanel>
            <DoctorsTabs doctors={Cardiologist}></DoctorsTabs>
          </TabPanel>
          <TabPanel>
            <DoctorsTabs doctors={Endocrinologist}></DoctorsTabs>
          </TabPanel>
          <TabPanel>
            <DoctorsTabs doctors={Urologist}></DoctorsTabs>
          </TabPanel>
          <TabPanel>
            <DoctorsTabs doctors={Neurologist}></DoctorsTabs>
          </TabPanel>
          <TabPanel>
            <DoctorsTabs doctors={Orthopedic}></DoctorsTabs>
          </TabPanel>
          <TabPanel>
            <DoctorsTabs doctors={Dermatologist}></DoctorsTabs>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllDoctors;
