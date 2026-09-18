import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ThemeProvider } from './context/ThemeContext';
import { useState } from 'react';
import './App.css';

// Pages
import { HomePage } from './pages/Home';
import { HowItWorksPage } from './pages/HowItWorks';
import { ForBusinessesPage } from './pages/ForBusinesses';
import { ForProvidersPage } from './pages/ForProviders';
import { IndustriesPage } from './pages/Industries';
import { WhyFixoraPage } from './pages/WhyFixora';
import { CustomersPage } from './pages/Customers';
import { FAQPage } from './pages/FAQ';
import { CareersPage } from './pages/Careers';
import { ContactPage } from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <ThemeProvider>
      <Preloader onComplete={() => setAppReady(true)} />
      <CustomCursor />
      {appReady && (
        <>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/for-businesses" element={<ForBusinessesPage />} />
            <Route path="/for-providers" element={<ForProvidersPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/why-fixora" element={<WhyFixoraPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
