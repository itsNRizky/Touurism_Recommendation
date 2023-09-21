import { Link, useParams } from "react-router-dom";
import back from "../assets/left white.png";
import location from "../assets/Location.png";
import star from "../assets/star.png";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState({});
  useEffect(() => {
    fetch(`https://nrizky.pythonanywhere.com/api/bestplaces?id=${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {},
    })
      .then((res) => res.json())
      .then((res) => setDestination(res));
  }, []);
  return (
    <div className="h-screen">
      <div
        style={{
          backgroundImage: `url('https://direktoripariwisata.id/imgunit/${id}.jpg')`,
        }}
        className={`h-1/2 bg-cover bg-bottom p-4`}
      >
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b1e2873]">
              <img src={back} />
            </div>
          </Link>
          <h3 className="text-lg text-white">Details</h3>
          <div className="h-11 w-11 bg-black opacity-0"></div>
        </div>
      </div>

      <div className="relative -top-20 mb-10 mb-4 h-1/2 rounded-t-[40px] bg-white px-4 py-6">
        <h2 className="text-2xl font-medium text-[#1B1E28]">
          {destination.name}
        </h2>
        <div className="my-2 flex items-start">
          <img className="mt-1" src={location} />
          <p className="ml-1 text-[#7D848D]">{destination.address}</p>
        </div>
        <div className="my-2 flex items-center">
          <img src={star} />
          <p className="ml-1 text-lg font-medium">{destination.rating}</p>
        </div>
        <p className="text-lg font-medium text-[#0373F3]">
          {destination.ticket === 0
            ? "Gratis"
            : `Rp. ${new Intl.NumberFormat().format(destination.ticket)}`}
        </p>
        <h3 className="mt-5 text-2xl font-medium">Tentang Destinasi</h3>
        <div className="mb-4 h-[30vh] overflow-y-auto pb-8 text-[#7D848D]">
          <p className="mb-1 text-justify">{destination.desc}</p>
          <p className="mb-1">{destination.facility}</p>
          <p>{destination.open_time}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
