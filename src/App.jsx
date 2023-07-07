import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import BestPlaces from "./pages/BestPlaces";
import RecommendForm from "./pages/RecommendForm";
import RecommendTransport from "./pages/RecommendTransport";
import RecommendStay from "./pages/RecommendStay";
import RecommendDestination from "./pages/RecommendDestination";
import RecommendResult from "./pages/RecommendResult";

function App() {
  return (
    <div className="m-auto sm:h-screen sm:w-[425px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/bestplaces" element={<BestPlaces />} />
        <Route path="/recommend" element={<RecommendForm />} />
        <Route
          path="/recommend/transportation"
          element={<RecommendTransport />}
        />
        <Route path="/recommend/stay" element={<RecommendStay />} />
        <Route
          path="/recommend/destination"
          element={<RecommendDestination />}
        />
        <Route path="/recommend/result" element={<RecommendResult />} />
      </Routes>
    </div>
  );
}

export default App;
