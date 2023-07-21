import back from "../assets/left black.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";

const RecommendDestination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state.formData);

  const [budget, setBudget] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState();
  const [tempSelectedDestinations, setTempSelectedDestinations] = useState([]);

  useEffect(() => {
    setBudget(formData.budget);
    fetch(`${import.meta.env.VITE_API_SERVER}/api/recommend_wisata`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => setDestinations(res));
  }, []);

  // const budgetSubstractDestinationHandler = (price) => {
  //   setBudget(budget - price);
  // };

  const budgetSubstractDestinationHandler = (price) => {
    const substractedPrice = budget - price;
    if (substractedPrice < 0) {
      alert(
        "Sepertinya item ini terlalu mahal untuk budget kamu, pilih ulang ya!"
      );
      window.location.reload();
    } else {
      setBudget(budget - price);
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      budget: budget,
    }));
  }, [budget]);

  const submitHandler = (e) => {
    if (destination.length !== 0) {
      e.preventDefault();
      sessionStorage.setItem("destination", JSON.stringify(destination));
      sessionStorage.setItem("budget", budget);
      navigate("/recommend/result", {
        state: {
          formData: formData,
        },
      });
    } else {
      alert("Kamu belum memilih satu destinasi pun!");
    }
  };

  const selectedHandler = (data) => {
    if (tempSelectedDestinations.some((item) => item.id === data.id)) {
      removeSelectedDestination(data);
    } else {
      addSelectedDestination(data);
    }
  };

  useEffect(() => {
    setDestination(tempSelectedDestinations);
  }, [tempSelectedDestinations]);

  const addSelectedDestination = (destination) => {
    setTempSelectedDestinations((prev) => [...prev, destination]);
  };

  const removeSelectedDestination = (destination) => {
    const updatedTempDestination = tempSelectedDestinations.filter(
      (value) => value.id !== destination.id
    );
    setTempSelectedDestinations(updatedTempDestination);
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
          <div className="rounded-xl bg-[#F7F7F9] px-4 py-3 font-medium active:border-none">
            Penginapan
          </div>
          <div className="rounded-xl bg-[#0373F3] px-4 py-3 font-medium text-white active:border-none">
            Wisata
          </div>
        </nav>
        <div className="h-[60vh] overflow-y-auto">
          {destinations.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                selectedHandler({
                  address: d.address,
                  name: d.name,
                  ticket: d.ticket,
                  rating: d.rating,
                  id: d.id,
                });
              }}
            >
              <DestinationCard
                address={d.address}
                name={d.name}
                price={d.ticket}
                rating={d.rating}
                id={d.id}
                substractPrice={budgetSubstractDestinationHandler}
              />
            </div>
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
        Selanjutnya
      </button>
    </div>
  );
};

export default RecommendDestination;
