import {
  FaFacebook,
  FaMapMarkerAlt,
  FaPhoneVolume,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-20 bg-secondary text-white">
        <div data-aos="fade-up" className="lg:flex container mx-auto gap-10">
          <div className="lg:w-2/6 pr-10 ">
            <p className="text-3xl font-marcellus">CareQuest</p>
            <p className="mt-5 font-jost">
              Founded in 1998, CareQuest Resort is located on the hills of
              Zermatt, immersing you in the wonder of the Swiss Alps against the
              pure sky. Welcome to CareQuest, Zermatt.
            </p>
            <p className="flex gap-4 text-2xl text-white mt-6">
              <FaFacebook /> <FaTwitter /> <SiInstagram />
            </p>
          </div>
          <div className="lg:w-2/6  flex justify-between gap-10">
            <div className="w-1/2 ">
              <p className="text-xl font-marcellus">About Us</p>
              <ul className="mt-5">
                <li className=" font-jost">Our Story</li>
                <li className=" font-jost">Contact Us</li>
                <li className=" font-jost">Premium Services</li>
                <li className=" font-jost">Careers</li>
                <li className=" font-jost">Blog</li>
              </ul>
            </div>
            <div className="lg:w-1/2 ">
              <p className="text-xl font-marcellus">Experiences</p>
              <ul className="mt-5">
                <li className=" font-jost">Our Story</li>
                <li className=" font-jost">Contact Us</li>
                <li className=" font-jost">Premium Services</li>
                <li className=" font-jost">Careers</li>
                <li className=" font-jost">Blog</li>
              </ul>
            </div>
          </div>
          <div className="lg:w-2/6 ">
            <p className="text-xl font-marcellus">Reach Out</p>
            <ul className="mt-5 space-y-2">
              <li className=" font-jost items-center flex gap-2">
                <span>
                  <FaMapMarkerAlt />
                </span>{" "}
                Guidino 25, 6900, Lugano, Switzerland
              </li>
              <li className="flex items-center gap-2 font-jost">
                <span>
                  <MdEmail />
                </span>
                info@cozystay.com
              </li>
              <li className="flex items-center gap-2 font-jost">
                <span>
                  <FaPhoneVolume />
                </span>
                +41 22 345 67 88
              </li>
              <li className="font-jost mt-5">Get Direction</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
