import { Link } from "react-router-dom";
import BestDestinationCard from "../components/BestDestinationCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [destination, setDestination] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER}/api/bestplaces?id=`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {},
    })
      .then((res) => res.json())
      .then((res) => setDestination(res.slice(0, 5)));
  }, []);
  return (
    <div className="px-4">
      <h1 className="my-10 text-4xl font-bold leading-normal text-[#2E323E] sm:my-6">
        Temukan keajaiban di <span className="text-[#0373F3]">Madiun!</span>
      </h1>
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Tempat Terbaik</h2>
          <Link to={"/bestplaces"}>
            <p className="text-lg text-[#0373F3]">Lihat Semua</p>
          </Link>
        </div>
        <div className="flex overflow-x-auto py-5">
          {destination.map((d) => (
            <BestDestinationCard
              key={d.id}
              id={d.id}
              name={d.name}
              rating={d.rating}
              address={d.address}
            />
          ))}
        </div>
      </div>
      <Link to={"/recommend"}>
        <button className="my-3 w-full rounded-xl bg-[#0373F3] py-5 text-center font-medium text-white active:bg-[#085dbe]">
          Rekomendasikan Saya!
        </button>
      </Link>
    </div>
  );
};

export default Home;
