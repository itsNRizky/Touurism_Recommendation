import { Link, useNavigate } from "react-router-dom";
import back from "../assets/left black.png";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Tab } from "@headlessui/react";

const RecommendForm = () => {
  const navigate = useNavigate();
  const [transportation, setTransportation] = useState(50);
  const [stay, setStay] = useState(50);
  const [formData, setFormData] = useState({
    origin: "",
    duration: "",
    departure: "",
    budget: "",
    transport_preference: transportation,
    stay_preference: stay,
    destination_preference: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.origin === "" ||
      formData.duration === "" ||
      formData.departure === "" ||
      formData.budget === "" ||
      formData.stay_preference === ""
    ) {
      alert("Mohon isi data dengan lengkap ya!!");
      window.location.reload();
    } else {
      sessionStorage.setItem("budget", formData.budget);
      sessionStorage.setItem("transport", JSON.stringify({ id: "" }));
      navigate("/recommend/transportation", {
        state: {
          formData: formData,
        },
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const numberOnlyFilter = (e) => {
    const regex = /\d/;
    if (!regex.test(e.target.value)) {
      alert("Hanya dapat berisi angka");
      window.location.reload();
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      transport_preference: transportation,
      stay_preference: stay,
    });
  }, [transportation, stay]);
  return (
    <div className="overflow-x-hidden p-4">
      <Link to={"/"}>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F7F9]">
          <img src={back} />
        </div>
      </Link>
      <h1 className=" text-center text-3xl font-medium text-[#1B1E28]">
        Perlu Rekomendasi?
      </h1>
      <p className="mt-1 text-center text-[#7D848D]">
        Mari tentukan preferensi kamu dulu ya!
      </p>
      <form
        className="mt-5 flex h-[80vh] flex-col justify-between overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <div className="">
          <p className="text-[#7D848D]">Berapa budget kamu?</p>
          <input
            required
            className="mb-5 w-full rounded-xl bg-[#F7F7F9] py-5 pl-3 placeholder-[#7D848D]"
            placeholder="Berapa budget kamu?"
            type="text"
            name="budget"
            inputMode="numeric"
            value={new Intl.NumberFormat().format(
              formData.budget.replace(/,/g, "")
            )}
            onKeyDown={numberOnlyFilter}
            onChange={handleChange}
          />
          <p className="mb-5 text-center text-[#7D848D]">
            Sesuaikan preferensi kamu dibawah ini ya!
          </p>
          <Tab.Group>
            <Tab.List className={"m-auto mb-5 flex justify-between"}>
              <Tab>
                {({ selected }) => (
                  <div
                    className={`rounded-xl ${
                      selected ? "bg-[#0373F3] text-white" : "bg-[#F7F7F9]"
                    } px-4 py-3 font-medium active:border-none`}
                  >
                    Transportasi
                  </div>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <div
                    className={`rounded-xl ${
                      selected ? "bg-[#0373F3] text-white" : "bg-[#F7F7F9]"
                    } px-4 py-3 font-medium active:border-none`}
                  >
                    Penginapan
                  </div>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <div
                    className={`rounded-xl ${
                      selected ? "bg-[#0373F3] text-white" : "bg-[#F7F7F9]"
                    } px-4 py-3 font-medium active:border-none`}
                  >
                    Wisata
                  </div>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div>
                  <h3 className="font-bold text-[#7D848D]">
                    Preferensi Kamu Untuk Transportasi
                  </h3>
                  <select
                    required
                    className="mb-5 w-full rounded-xl bg-[#F7F7F9] py-5 pl-3 text-[#7D848D]"
                    name="origin"
                    defaultValue={""}
                    value={formData.origin}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Stasiun terdekat dengan tempat kamu
                    </option>
                    <option value={"PASARSENEN"}>Pasar Senen, Jakarta</option>
                    <option value={"BANDUNG"}>Bandung, Bandung</option>
                    <option value={"SEMARANG TAWANG"}>Tawang, Semarang</option>
                    <option value={"SOLO BALAPAN"}>
                      Solo Balapan, Surakarta
                    </option>
                    <option value={"SURABAYA GUBENG"}>Gubeng, Surabaya</option>
                    <option value={"YOGYAKARTA"}>Tugu, Yogyakarta</option>
                  </select>
                  <select
                    required
                    className="mb-5 w-full rounded-xl bg-[#F7F7F9] py-5 pl-3 text-[#7D848D]"
                    name="departure"
                    defaultValue={""}
                    value={formData.departure}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Preferensi Waktu Keberangkatan:
                    </option>
                    <option value={"Pagi"}>06:00-12:00</option>
                    <option value={"Siang"}>12:00-15:00</option>
                    <option value={"Sore"}>15:00-18:00</option>
                    <option value={"Malam"}>18:00-06:00</option>
                    <option value={"Bebas"}>Fleksibel</option>
                  </select>
                  <p className="text-[#7D848D]">Preferensi Transportasi</p>
                  <Slider
                    startPoint={50}
                    step={10}
                    dots
                    value={transportation}
                    onChange={setTransportation}
                    marks={{ 0: "Harga Murah", 100: "Kenyamanan" }}
                    className="m-auto mb-10 w-4/5"
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <h3 className="font-bold text-[#7D848D]">
                    Preferensi Kamu Untuk Penginapan
                  </h3>
                  <input
                    required
                    className="mb-5 w-full rounded-xl bg-[#F7F7F9] py-5 pl-3 placeholder-[#7D848D]"
                    placeholder="Berapa malam akan menginap?"
                    inputMode="numeric"
                    type="number"
                    min={1}
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  <p className="text-[#7D848D]">Preferensi Penginapan</p>
                  <Slider
                    startPoint={50}
                    step={10}
                    dots
                    value={stay}
                    onChange={setStay}
                    marks={{ 0: "Harga Murah", 100: "Kenyamanan" }}
                    className="m-auto mb-10 w-4/5"
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <h3 className="font-bold text-[#7D848D]">
                    Preferensi Kamu Untuk Destinasi Wisata
                  </h3>
                  <select
                    required
                    className="mb-5 w-full rounded-xl bg-[#F7F7F9] py-5 pl-3 text-[#7D848D]"
                    name="destination_preference"
                    defaultValue={""}
                    value={formData.destination_preference}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Preferensi wisata
                    </option>
                    <option value={"pm"}>Paling Murah</option>
                    <option value={"dn"}>Normal</option>
                    <option value={"pn"}>Paling Nyaman</option>
                  </select>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <input
          className=" w-full cursor-pointer rounded-xl bg-[#0373F3] py-4 text-center font-medium text-white"
          type="submit"
          value={"Rekomendasikan Saya!"}
        />
      </form>
    </div>
  );
};

export default RecommendForm;
