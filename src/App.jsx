import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Listings from "./Pages/Listings/Listings";
import ListingDetail from "./Components/ListingDetail/ListingDetail";
import Realtors from "./Pages/Realtors/Realtors";
import ChatBot from "./Components/ChatBot/ChatBot";
import OpenHouseForm from "./Components/OpenHouseForm/OpenHouseForm";

function App() {
  return (
    <Router basename="/">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/realtors" element={<Realtors />} />
          <Route path="/open-house" element={<OpenHouseForm />} />
          {/* Add more routes as needed */}
          {/* <Route path="/services" element={<Services />} />
          <Route path="/investment"={<Investment />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
