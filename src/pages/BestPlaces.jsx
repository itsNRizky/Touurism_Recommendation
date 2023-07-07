import { Link } from "react-router-dom";
import back from "../assets/left black.png";
import BestDestinationCard from "../components/BestDestinationCard";
import { useEffect, useState } from "react";

const BestPlaces = () => {
  const [destination, setDestination] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/bestplaces?id=")
      .then((res) => res.json())
      .then((res) => setDestination(res));
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F7F9]">
            <img src={back} />
          </div>
        </Link>
        <h3 className="text-xl font-medium">Tempat Terbaik</h3>
        <div className="h-11 w-11 bg-black opacity-0"></div>
      </div>
      <h1 className="mt-10 text-xl">Tempat Terbaik di Madiun!</h1>
      <div className="grid h-[80vh] grid-cols-2 overflow-y-scroll">
        {destination.map((d) => (
          <BestDestinationCard
            key={d.id}
            id={d.id}
            name={d.name}
            rating={d.rating}
            address={d.address}
            all={true}
          />
        ))}
      </div>
    </div>
  );
};

export default BestPlaces;
