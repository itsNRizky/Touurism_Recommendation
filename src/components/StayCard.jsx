/* eslint-disable react/prop-types */
const StayCard = ({
  stay_name,
  room_name,
  room_type,
  price,
  className,
  duration,
}) => {
  const type = ["Standard", "VIP"];
  return (
    <div className="mb-4 flex cursor-pointer rounded-2xl p-4 shadow-md shadow-gray-300">
      <div>
        <p className="text-xl font-medium text-[#1B1E28]">
          {room_name} {type[room_type - 1]}
        </p>
        <p className="text-[#7D848D]">{stay_name}</p>
        <p className={`w-40 rounded-lg ${className} px-4 py-2 text-white`}>
          Rp. {new Intl.NumberFormat().format(price)}
        </p>
        <p>{duration} malam</p>
      </div>
    </div>
  );
};

export default StayCard;
