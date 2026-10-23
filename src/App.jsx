import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import PageBackground from "./components/layout/PageBackground.jsx";
import ScrollRestoration from "./components/layout/ScrollRestoration.jsx";
import { LenisProvider } from "./hooks/useLenis.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageSkeleton from "./components/layout/PageSkeleton.jsx";

// Article pages load on demand, so the home page doesn't download three.js,
// the mockups or the WallGold demo. They're fetched in the background once the
// home page is idle, so opening one usually feels instant anyway.
const pages = {
  work: () => import("./pages/WorkDetailPage.jsx"),
  priceSignal: () => import("./pages/CaseStudyPriceSignal.jsx"),
  bitpinDeposit: () => import("./pages/CaseStudyBitpinDeposit.jsx"),
  pindo: () => import("./pages/CaseStudyPindoSecurePurchase.jsx"),
  bitpinMotion: () => import("./pages/ArticleBitpinMotion.jsx"),
  wallgold: () => import("./pages/CaseStudyWallGoldBnpl.jsx"),
};
const WorkDetailPage = lazy(pages.work);
const CaseStudyPriceSignal = lazy(pages.priceSignal);
const CaseStudyBitpinDeposit = lazy(pages.bitpinDeposit);
const CaseStudyPindoSecurePurchase = lazy(pages.pindo);
const ArticleBitpinMotion = lazy(pages.bitpinMotion);
const CaseStudyWallGoldBnpl = lazy(pages.wallgold);

function usePrefetchPages() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => window.setTimeout(fn, 2000));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => Object.values(pages).forEach((load) => load().catch(() => {})), { timeout: 4000 });
    return () => cancel(id);
  }, []);
}

export default function App() {
  usePrefetchPages();
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
