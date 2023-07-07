/* eslint-disable react/prop-types */
import star from "../assets/star.png";
import { Link } from "react-router-dom";

const BestDestinationCard = ({ name, rating, address, id, all }) => {
  return (
    <div className="mr-4 min-w-[85%] rounded-3xl p-4 shadow-md shadow-gray-300">
      <Link to={`/${id}`}>
        <div
          style={{
            backgroundImage: `url('https://direktoripariwisata.id/imgunit/${id}.jpg')`,
          }}
          className={` w-full rounded-2xl bg-cover ${
            all ? "h-[15vh]" : "h-[30vh]"
          }`}
        ></div>
        <div className="mt-3 flex flex-col justify-between">
          <h3 className="text-xl font-medium">{name}</h3>
          <div className="flex items-center">
            <img src={star} />
            <p className="ml-1">{rating}</p>
          </div>
        </div>
        <div className={`mt-1 flex ${all ? "hidden" : "block"}`}>
          {/* <img className="h-4 w-8" src={location} /> */}
          <p className="ml-1 text-[#7D848D]">{address}</p>
        </div>
      </Link>
    </div>
  );
};

export default BestDestinationCard;
