/* eslint-disable react/prop-types */
import calendar from "../assets/Calendar.png";

const TransportCard = ({
  train_name,
  train_class,
  price,
  depart,
  arrival,
  className,
}) => {
  const t_class = ["Ekonomi", "Bisnis", "Eksekutif"];
  return (
    <div className="mb-4 flex cursor-pointer justify-between rounded-2xl p-4 shadow-md shadow-gray-300">
      <div>
        <p className="text-xl font-medium text-[#1B1E28]">{train_name}</p>
        <p className="text-[#7D848D]">{t_class[train_class - 1]}</p>
        <p className="flex items-center text-[#7D848D]">
          <img className="mr-1" src={calendar} />
          {`${arrival.slice(-8, -3)} - ${depart.slice(-8, -3)}`}
        </p>
      </div>
      <div>
        <p className={`rounded-lg ${className} px-4 py-2 text-white`}>
          Rp. {new Intl.NumberFormat().format(price)}
        </p>
      </div>
    </div>
  );
};

export default TransportCard;
