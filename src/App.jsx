import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import PageBackground from "./components/layout/PageBackground.jsx";
import { LenisProvider } from "./hooks/useLenis.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorkDetailPage from "./pages/WorkDetailPage.jsx";
import CaseStudyBitpinDeposit from "./pages/CaseStudyBitpinDeposit.jsx";
import CaseStudyPriceSignal from "./pages/CaseStudyPriceSignal.jsx";

export default function App() {
  return (
    <LenisProvider>
      <BrowserRouter>
        <PageBackground />
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:id" element={<WorkDetailPage />} />
            <Route
              path="/case-studies/price-signal"
              element={<CaseStudyPriceSignal />}
            />
            <Route
              path="/case-studies/bitpin-deposit"
              element={<CaseStudyBitpinDeposit />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </LenisProvider>
  );
}
