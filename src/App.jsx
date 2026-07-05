import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DestinationListingPage from "./pages/DestinationListingPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import GuideListingPage from "./pages/GuideListingPage";
import GuideDetailPage from "./pages/GuideDetailPage";
import StoryListingPage from "./pages/StoryListingPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import WeatherPage from "./pages/WeatherPage";
import AboutPage from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<DestinationListingPage />} />
        <Route path="/destination/:slug" element={<DestinationDetailPage />} />
        <Route path="/guides" element={<GuideListingPage />} />
        <Route path="/guide/:slug" element={<GuideDetailPage />} />
        <Route path="/stories" element={<StoryListingPage />} />
        <Route path="/story/:slug" element={<StoryDetailPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
