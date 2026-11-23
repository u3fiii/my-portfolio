import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import PageBackground from "./components/layout/PageBackground.jsx";
import ScrollRestoration from "./components/layout/ScrollRestoration.jsx";
import { LenisProvider } from "./hooks/useLenis.jsx";
import PageSkeleton from "./components/layout/PageSkeleton.jsx";

import { pageLoaders } from "./routes/pageLoaders.js";
import { workDetailPath } from "./routes/paths.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));

const WorkDetailPage = lazy(pageLoaders["/work/:id"]);
const CaseStudyPriceSignal = lazy(pageLoaders[workDetailPath("price-signal")]);
const CaseStudyBitpinDeposit = lazy(pageLoaders[workDetailPath("bitpin-deposit")]);
const CaseStudyPindoSecurePurchase = lazy(pageLoaders[workDetailPath("pindo-secure-purchase")]);
const ArticleBitpinMotion = lazy(pageLoaders[workDetailPath("bitpin-motion")]);
const CaseStudyWallGoldBnpl = lazy(pageLoaders[workDetailPath("wallgold-bnpl")]);
const GameWander = lazy(pageLoaders[workDetailPath("wander")]);
const GameMote = lazy(pageLoaders[workDetailPath("mote")]);

export default function App() {
  return (
    <LenisProvider>
      <BrowserRouter>
        <ScrollRestoration />
        <PageBackground />
        <Header />
        <div className="page-content">
          <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:id" element={<WorkDetailPage />} />
            <Route path="/games/wander" element={<GameWander />} />
            <Route path="/games/mote" element={<GameMote />} />
            <Route path="/games/lana" element={<Navigate to="/games/mote" replace />} />
            <Route
              path="/case-studies/price-signal"
              element={<CaseStudyPriceSignal />}
            />
            <Route
              path="/case-studies/bitpin-deposit"
              element={<CaseStudyBitpinDeposit />}
            />
            <Route
              path="/case-studies/pindo-secure-purchase"
              element={<CaseStudyPindoSecurePurchase />}
            />
            <Route
              path="/case-studies/bitpin-motion"
              element={<ArticleBitpinMotion />}
            />
            <Route
              path="/case-studies/wallgold-bnpl"
              element={<CaseStudyWallGoldBnpl />}
            />
          </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </LenisProvider>
  );
}
