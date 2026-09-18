import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';

const faqCategories = [
  {
    id: 'businesses',
    label: 'For Businesses',
    faqs: [
      { q: 'How does FIXORA work for businesses?', a: 'FIXORA is a B2B service management platform. Your business registers on the platform, submits service requests, and FIXORA matches you with verified providers based on service type, location and urgency. You track every job through your dashboard from request to completion.' },
      { q: 'What types of services can businesses request?', a: 'Businesses can request any of our 8 core service categories: Property Maintenance, Plumbing, Electrical, HVAC & AC, Cleaning, Painting, Pest Control and Security. Each category includes a range of specific services.' },
      { q: 'Can I manage multiple sites through one account?', a: 'Yes. FIXORA\'s platform is built for multi-site management. You can manage service requests, track jobs and view service history across all your properties from a single dashboard.' },
      { q: 'How quickly will a provider be assigned to my request?', a: 'Our average provider match time is under 2 hours for standard requests. For emergency or urgent requests, we prioritise faster matching with providers available for same-day or next-day response.' },
      { q: 'How do I track the status of a job?', a: 'Your FIXORA dashboard provides real-time job tracking — from request submission to provider assignment, attendance confirmation and completion sign-off. You receive status notifications at each stage.' },
      { q: 'Are service records and compliance documents kept?', a: 'Yes. FIXORA automatically maintains comprehensive service records, completion reports, photo documentation and compliance documents for every job. These are always accessible from your account.' },
    ],
  },
  {
    id: 'providers',
    label: 'For Service Providers',
    faqs: [
      { q: 'How do I become a FIXORA service provider?', a: 'You can apply through our Provider application form on the website or the Contact page. Our team will review your credentials, certifications and service area before completing verification and onboarding.' },
      { q: 'What verification is required to join FIXORA?', a: 'All providers undergo a background check (DBS check), credential and certification verification relevant to their trade, and a review of their service history. This ensures only qualified professionals join the platform.' },
      { q: 'How will I receive job opportunities?', a: 'Once onboarded, you\'ll receive job opportunity notifications via the FIXORA platform whenever a business request matches your specialisation, location and availability. You can review and accept or decline each job.' },
      { q: 'Can I choose which jobs to accept?', a: 'Yes. FIXORA does not force job assignments. You receive a job alert with full details — including location, service type, scope and schedule — and you can accept or decline based on your availability.' },
      { q: 'How and when are providers paid?', a: 'Payment terms and processes are structured through the FIXORA platform. Upon completion and client sign-off of each job, payment is processed according to agreed terms. Full transparency on all invoicing and payments.' },
      { q: 'How does my performance on FIXORA affect future jobs?', a: 'FIXORA tracks provider performance including completion rates, client ratings and quality scores. Strong performance leads to more job opportunities and priority matching for high-value contracts.' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    faqs: [
      { q: 'What service categories does FIXORA cover?', a: 'FIXORA covers 8 core service categories: Property Maintenance, Plumbing, Electrical, HVAC & AC, Cleaning, Painting, Pest Control and Security. Within each category, a wide range of specific services are available.' },
      { q: 'Are FIXORA providers certified for their trade?', a: 'Yes. All providers are verified for relevant certifications — for example, electricians are NICEIC certified, gas engineers are Gas Safe registered, and cleaning teams are trained in relevant standards.' },
      { q: 'Can FIXORA handle emergency service requests?', a: 'Yes. FIXORA supports urgent and emergency service requests with priority matching. For categories like plumbing and electrical, providers are available for same-day and 24-hour emergency response.' },
      { q: 'What happens if a service is not completed to standard?', a: 'FIXORA has a quality assurance process for every job. If a service does not meet the required standard, FIXORA will arrange a re-visit or resolution at no additional cost, backed by each service\'s guarantee period.' },
      { q: 'Can I request preventive maintenance schedules?', a: 'Yes. FIXORA supports both reactive and preventive maintenance. Businesses can set up recurring maintenance schedules for any service category to proactively manage their property.' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    faqs: [
      { q: 'How is pricing determined for services?', a: 'Pricing is transparent and agreed before work begins. FIXORA provides clear pricing based on service type, scope, location and urgency. There are no hidden fees or surprise invoices.' },
      { q: 'Are there any subscription fees for businesses?', a: 'FIXORA operates on a straightforward commercial model. Contact our team to discuss the pricing structure most suitable for your business size and service requirements.' },
      { q: 'How are invoices managed?', a: 'All invoicing is managed through the FIXORA platform. After each completed job, a digital invoice is generated and available in your account. Businesses can also access consolidated billing across all sites.' },
      { q: 'What payment methods are supported?', a: 'FIXORA supports standard business payment methods including bank transfer and card payment. Specific payment terms are agreed as part of your business account setup.' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    faqs: [
      { q: 'How do I create a FIXORA business account?', a: 'Contact our team through the Business Enquiry form on our Contact page. Our team will set up your account, guide you through the platform and ensure everything is configured for your specific requirements.' },
      { q: 'Can multiple team members access the same account?', a: 'Yes. FIXORA business accounts support multiple users with different permission levels — so your facility managers, operations team and finance team can all access relevant parts of the platform.' },
      { q: 'What happens to my data on FIXORA?', a: 'FIXORA handles all business and service data in accordance with GDPR regulations. Your service history, provider records and compliance documents are securely stored and accessible only to your authorised users.' },
      { q: 'Can I export my service records and reports?', a: 'Yes. Your FIXORA dashboard includes reporting and export functionality — allowing you to generate service history reports, compliance summaries and performance analytics in standard formats.' },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    faqs: [
      { q: 'How do I contact FIXORA support?', a: 'You can reach our support team via email at hello@fixora.com, by phone, or through the live chat function on the platform. For urgent commercial matters, we also offer WhatsApp support.' },
      { q: 'Is support available 24/7?', a: 'The FIXORA platform is available 24/7 for job requests and tracking. Our support team is available during business hours for account and billing queries, with emergency support available for critical operational issues.' },
      { q: 'What if I have a dispute with a service provider?', a: 'FIXORA provides a structured dispute resolution process. If you have any concern about a job, contact our support team immediately. We will investigate, liaise with the provider and ensure a fair resolution.' },
    ],
  },
];

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('businesses');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const currentCat = faqCategories.find(c => c.id === activeCategory)!;
  const filteredFaqs = currentCat.faqs.filter(
    faq => !search || faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="inner-hero-section faq-hero">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">FREQUENTLY ASKED QUESTIONS</span>
          <h1 className="inner-hero-title">Got questions?<br />We have answers.</h1>
          <p className="inner-hero-subtitle">Everything you need to know about FIXORA for businesses and service providers.</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-section">
        <div className="container">
          {/* Search */}
          <div className="faq-search-wrapper">
            <Search size={18} className="faq-search-icon" />
            <input
              className="faq-search-input"
              placeholder="Search questions..."
              value={search}
              onChange={e => { setSearch(e.target.value); }}
            />
          </div>

          {/* Category Tabs */}
          <div className="faq-category-tabs">
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                className={`faq-cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat.id); setOpenItem(null); setSearch(''); }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="faq-accordion">
            {filteredFaqs.length === 0 ? (
              <p className="faq-no-results">No results found. Try a different search term.</p>
            ) : filteredFaqs.map((faq, i) => {
              const key = `${activeCategory}-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenItem(isOpen ? null : key)}>
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'open' : ''}`} />
                  </button>
                  <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Still have questions?</h2>
            <p className="inner-cta-sub">Our team is here to help. Reach out through any of our contact channels.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary pill">Contact Our Team</Link>
              <a href="mailto:hello@fixora.com" className="btn-ghost light-link">hello@fixora.com <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
