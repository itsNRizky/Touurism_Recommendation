import { Link, useLocation, useNavigate } from "react-router-dom";
import back from "../assets/left black.png";
import TransportCard from "../components/TransportCard";
import StayCard from "../components/StayCard";
import DestinationCard from "../components/DestinationCard";

const RecommendResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const duration = location.state.formData.duration;
  const result = location.state.selected;
  const budget = location.state.formData.budget;

  const submitHandler = () => {
    navigate("/");
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Link to={"/recommend"}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F7F9]">
            <img src={back} />
          </div>
        </Link>
        <h3 className="text-xl font-medium">Hasil Rekomendasi</h3>
        <div className="h-11 w-11 bg-black opacity-0"></div>
      </div>
      <div className="mt-5">
        <div className="h-[70vh] overflow-y-auto">
          <TransportCard
            arrival={result.transportation.arrival}
            depart={result.transportation.depart}
            price={result.transportation.price}
            train_class={result.transportation.train_class}
            train_name={result.transportation.train_name}
            className={"bg-[#0373F3]"}
          />
          <StayCard
            className={"bg-[#0373F3]"}
            price={result.stay.price}
            room_name={result.stay.name_room}
            room_type={result.stay.room_type}
            stay_name={result.stay.name_hotel}
            duration={duration == 1 ? 1 : duration - 1}
          />
          {result.destination.map((d) => (
            <DestinationCard
              key={d.id}
              address={d.address}
              name={d.name}
              id={d.id}
              price={d.ticket}
              rating={d.rating}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-xl font-bold">Sisa Budget Kamu</p>
        <p className="text-xl font-bold">
          Rp. {new Intl.NumberFormat().format(budget)}
        </p>
      </div>
      <button
        onClick={submitHandler}
        className="my-3 w-full rounded-xl bg-[#0373F3] py-5 text-center font-medium text-white active:bg-[#085dbe]"
      >
        Kembali ke Menu Utama
      </button>
    </div>
  );
};

export default RecommendResult;
