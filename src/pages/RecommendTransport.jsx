import back from "../assets/left black.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransportCard from "../components/TransportCard";
import { RadioGroup } from "@headlessui/react";

const RecommendTransport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state.formData);
  const [budget, setBudget] = useState(0);
  const [initialBudget, setInitialBudget] = useState(0);
  const [transportations, setTransportations] = useState([]);
  const [transport, setTransport] = useState(
    JSON.parse(sessionStorage.getItem("transport"))
  );

  useEffect(() => {
    setInitialBudget(formData.budget.replace(/,/g, ""));
    setBudget(sessionStorage.getItem("budget").replace(/,/g, ""));
    fetch(
      `https://d4dc-114-142-168-3.ngrok-free.app/api/recommend_transportasi`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: formData.origin,
          duration: formData.duartion,
          departure: formData.departure,
          budget: formData.budget.replace(/,/g, ""),
          transport_preference: formData.transport_preference,
          stay_preference: formData.stay_preference,
          destination_preference: formData.destination_preference,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setTransportations(res));
  }, []);

  useEffect(() => {
    setTransport(JSON.parse(sessionStorage.getItem("transport")));
  }, [transportations]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      budget: budget,
    }));
  }, [budget]);

  const budgetSubstractTransportHandler = (price) => {
    const substractedPrice = initialBudget - price;
    if (substractedPrice < 0) {
      alert("Sepertinya item ini terlalu mahal untuk budget kamu");
    } else {
      setBudget(initialBudget - price);
    }
  };

  const submitHandler = (e) => {
    if (transport.train_name !== undefined) {
      e.preventDefault();
      sessionStorage.setItem("transport", JSON.stringify(transport));
      sessionStorage.setItem("stay", JSON.stringify({ id: "" }));
      sessionStorage.setItem("budget", budget);
      navigate("/recommend/stay", {
        state: { formData: formData },
      });
    } else {
      alert("Anda belum memilih transportasi!");
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
          <div className="rounded-xl bg-[#0373F3] px-4 py-3 font-medium text-white active:border-none">
            Transportasi
          </div>
          <div className="rounded-xl bg-[#F7F7F9] px-4 py-3 font-medium active:border-none">
            Penginapan
          </div>
          <div className="rounded-xl bg-[#F7F7F9] px-4 py-3 font-medium active:border-none">
            Wisata
          </div>
        </nav>
        <div className="h-[60vh] overflow-y-auto">
          <RadioGroup
            aria-required={"true"}
            value={transport}
            onChange={setTransport}
          >
            {transportations.length !== 0 ? (
              transportations.map((t) => (
                <RadioGroup.Option
                  onClick={() => {
                    budgetSubstractTransportHandler(t.price);
                  }}
                  key={t.id}
                  value={t}
                >
                  {() => (
                    <>
                      <TransportCard
                        className={`${
                          t.id === transport.id
                            ? "bg-green-500"
                            : "bg-[#0373F3]"
                        }`}
                        train_name={t.train_name}
                        train_class={t.train_class}
                        price={t.price}
                        depart={t.time_start}
                        arrival={t.time_end}
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))
            ) : (
              <h4 className="text-center">
                Sepertinya tidak ada kereta yang sesuai, coba atur lagi
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

export default RecommendTransport;
