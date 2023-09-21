import back from "../assets/left black.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import StayCard from "../components/StayCard";

const RecommendStay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state.formData);
  const [duration, setDuration] = useState(0);
  const [budget, setBudget] = useState(0);
  const [initialBudget, setInitialBudget] = useState(0);
  const [stays, setStays] = useState([]);
  const [stay, setStay] = useState(JSON.parse(sessionStorage.getItem("stay")));

  useEffect(() => {
    setInitialBudget(formData.budget);
    setBudget(sessionStorage.getItem("budget").replace(/,/g, ""));
    setDuration(formData.duration);
    fetch(`https://nrizky.pythonanywhere.com/api/recommend_penginapan`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => setStays(res));
  }, []);

  const budgetSubstractStayHandler = (price) => {
    const substractedPrice = initialBudget - price * duration;
    if (substractedPrice < 0) {
      alert(
        "Sepertinya item ini terlalu mahal untuk budget kamu, pilih ulang ya!"
      );
      window.location.reload();
    } else {
      setBudget(substractedPrice);
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      budget: budget,
    }));
  }, [budget]);

  const submitHandler = (e) => {
    if (stay.name_hotel !== undefined) {
      e.preventDefault();
      sessionStorage.setItem("budget", budget);
      sessionStorage.setItem("stay", JSON.stringify(stay));
      navigate("/recommend/destination", {
        state: {
          formData: formData,
        },
      });
    } else {
      alert("Anda belum memilih tempat penginapan!");
    }
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
      <p className="mt-1 text-center text-[#7D848D]">
        Silakan pilih hasil rekomendasi yang diberikan
      </p>
      <div className="mt-5">
        <nav className="flex w-full justify-around rounded-xl bg-[#F7F7F9] px-2 py-3">
          <div className="rounded-xl bg-[#F7F7F9] px-4 py-3 font-medium active:border-none">
            Transportasi
          </div>
          <div className="rounded-xl bg-[#0373F3]  px-4 py-3 font-medium text-white active:border-none">
            Penginapan
          </div>
          <div className="rounded-xl bg-[#F7F7F9] px-4 py-3 font-medium active:border-none">
            Wisata
          </div>
        </nav>
        <div className="h-[60vh] overflow-y-auto">
          <RadioGroup aria-required value={stay} onChange={setStay}>
            {stays.length !== 0 ? (
              stays.map((s) => (
                <RadioGroup.Option
                  onClick={() => {
                    budgetSubstractStayHandler(s.price);
                  }}
                  key={s.id}
                  value={s}
                >
                  {() => (
                    <>
                      <StayCard
                        className={
                          s.id === stay.id ? "bg-green-500" : "bg-[#0373F3]"
                        }
                        stay_name={s.name_hotel}
                        room_name={s.name_room}
                        price={s.price * duration}
                        room_type={s.type}
                        duration={duration}
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))
            ) : (
              <h4 className="text-center">
                Sepertinya tidak ada penginapan yang sesuai, coba atur lagi
                preferensi kamu!
              </h4>
            )}
          </RadioGroup>
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
        Selanjutnya
      </button>
    </div>
  );
};

export default RecommendStay;
