const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="w-4/12 mx-auto text-center space-y-2 my-8">
      <p className=" text-primary text-2xl font-bold">{subHeading}</p>
      <p className="">{heading}</p>
    </div>
  );
};

export default SectionTitle;
