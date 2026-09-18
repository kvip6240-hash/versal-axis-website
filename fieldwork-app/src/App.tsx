import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ThemeProvider } from './context/ThemeContext';
import { DemoProvider } from './context/DemoContext';
import { DemoControlBar } from './components/demo/DemoControlBar';
import { RequesterNavbar } from './components/demo/RequesterNavbar';

import './App.css';
import './styles/demo.css';

// Existing Pages
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
import { PrivacyPolicyPage } from './pages/PrivacyPolicy';
import { TermsConditionsPage } from './pages/TermsConditions';
import { CookiePolicyPage } from './pages/CookiePolicy';

// Requester Demo Pages
import { DemoLoginPage } from './pages/demo/DemoLogin';
import { RequesterDashboard } from './pages/demo/RequesterDashboard';
import { CreateRequestPage } from './pages/demo/CreateRequest';
import { RequestsPage } from './pages/demo/RequestsPage';
import { ProposalPage } from './pages/demo/ProposalPage';
import { PaymentPage } from './pages/demo/PaymentPage';
import { ProjectsPage } from './pages/demo/ProjectsPage';
import { ProjectDetailsPage } from './pages/demo/ProjectDetailsPage';
import { CompletionPage } from './pages/demo/CompletionPage';
import { FinalPaymentPage } from './pages/demo/FinalPaymentPage';
import { ReviewPage } from './pages/demo/ReviewPage';
import { NotificationsPage } from './pages/demo/NotificationsPage';
import { MessagesPage } from './pages/demo/MessagesPage';
import { ProfilePage } from './pages/demo/ProfilePage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (pathname === '/services') {
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function MainLayout() {
  const location = useLocation();
  const isRequesterRoute = location.pathname.startsWith('/requester');

  return (
    <div className={isRequesterRoute ? 'app-requester-portal' : 'app-public-website'}>
      <ScrollToTop />
      {isRequesterRoute ? <RequesterNavbar /> : <Navbar />}
      <Routes>
        {/* Existing Website Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/for-businesses" element={<ForBusinessesPage />} />
        <Route path="/for-providers" element={<ForProvidersPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/why-fixora" element={<WhyFixoraPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />

        {/* Requester Demo Module Routes */}
        <Route path="/demo-login" element={<DemoLoginPage />} />
        <Route path="/requester/dashboard" element={<RequesterDashboard />} />
        <Route path="/requester/create-request" element={<CreateRequestPage />} />
        <Route path="/requester/requests" element={<RequestsPage />} />
        <Route path="/requester/proposal/:id" element={<ProposalPage />} />
        <Route path="/requester/payment/:id" element={<PaymentPage />} />
        <Route path="/requester/projects" element={<ProjectsPage />} />
        <Route path="/requester/project/:id" element={<ProjectDetailsPage />} />
        <Route path="/requester/completion/:id" element={<CompletionPage />} />
        <Route path="/requester/final-payment/:id" element={<FinalPaymentPage />} />
        <Route path="/requester/review/:id" element={<ReviewPage />} />
        <Route path="/requester/notifications" element={<NotificationsPage />} />
        <Route path="/requester/messages" element={<MessagesPage />} />
        <Route path="/requester/profile" element={<ProfilePage />} />
      </Routes>
      {!isRequesterRoute && <Footer />}
      {isRequesterRoute && <DemoControlBar />}
    </div>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <ThemeProvider>
      <DemoProvider>
        <Preloader onComplete={() => setAppReady(true)} />
        <CustomCursor />
        {appReady && <MainLayout />}
      </DemoProvider>
    </ThemeProvider>
  );
}

export default App;
