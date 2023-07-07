/* eslint-disable react/prop-types */
import { useState } from "react";
import star from "../assets/star.png";

const DestinationCard = ({
  name,
  rating,
  address,
  price,
  id,
  substractPrice,
}) => {
  const [selected, setSelected] = useState(false);
  const selectHandler = () => {
    substractPrice(selected ? -price : price);
    setSelected(selected ? false : true);
  };
  return (
    <div
      onClick={selectHandler}
      className="mb-4 flex cursor-pointer rounded-2xl p-4 shadow-md shadow-gray-300"
    >
      <div
        style={{
          backgroundImage: `url('https://direktoripariwisata.id/imgunit/${id}.jpg')`,
        }}
        className={`mr-4 w-full rounded-2xl bg-cover bg-center`}
      ></div>
      <div>
        <p className="text-xl font-medium text-[#1B1E28]">{name}</p>
        <p className="text-[#7D848D]">{address}</p>
        <div className="flex items-center">
          <img src={star} />
          <p className="ml-1">{rating}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p
            className={`rounded-lg ${
              selected ? "bg-green-500" : "bg-[#0373F3]"
            } px-4 text-white`}
          >
            {price == 0
              ? "Gratis"
              : `Rp. ${new Intl.NumberFormat().format(price)}`}
          </p>
          <p className="text-[#0373F3] underline">Detail</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
