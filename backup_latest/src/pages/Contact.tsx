import { useState, useEffect } from 'react';
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';

type TabId = 'business' | 'provider' | 'general';

const tabs: { id: TabId; label: string }[] = [
  { id: 'business', label: '1. Business Enquiries' },
  { id: 'provider', label: '2. Provider Enquiries' },
  { id: 'general', label: '3. General Enquiries' },
];

const industries = ['Corporate Facilities', 'Industrial & Manufacturing', 'Logistics & Warehousing', 'Healthcare & Clinics', 'Retail & Chains', 'Hospitality', 'Commercial Buildings', 'Educational Institutions', 'Other'];
const services = ['Property Maintenance', 'Plumbing', 'Electrical', 'HVAC & AC', 'Cleaning', 'Painting', 'Pest Control', 'Security', 'Multiple Services'];
const serviceCategories = ['Property Maintenance', 'Plumbing', 'Electrical', 'HVAC & AC', 'Cleaning', 'Painting', 'Pest Control', 'Security'];
const experienceOptions = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];

export function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabId>('business');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setForm({}); setSubmitted(false); }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <span className="kicker">GET IN TOUCH</span>
          <h1 className="contact-hero-title">How can we help?</h1>
          <p className="contact-hero-sub">Choose your enquiry type below and we'll connect you with the right team.</p>
        </div>
      </section>

      {/* Tabs + Form Area */}
      <section className="contact-main-section">
        <div className="container">
          {/* Tab Selector */}
          <div className="contact-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`contact-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="contact-body">
            {/* Left — Form */}
            <div className="contact-form-col">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✓</div>
                  <h3>Enquiry Received</h3>
                  <p>Thank you for reaching out. Our team will respond within 1 business day.</p>
                  <button className="btn-primary pill" onClick={() => setSubmitted(false)} style={{ marginTop: 24 }}>
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {activeTab === 'business' && (
                    <>
                      <h2 className="contact-form-title">Discuss Business Facility &amp; Service Needs</h2>
                      <p className="contact-form-desc">Tell us about your business and service requirements — we'll get back to you within 1 business day.</p>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Full Name <span className="req">*</span></label>
                          <input name="name" type="text" placeholder="Your full name" required onChange={handleChange} value={form.name || ''} />
                        </div>
                        <div className="form-group">
                          <label>Company Name <span className="req">*</span></label>
                          <input name="company" type="text" placeholder="Your company" required onChange={handleChange} value={form.company || ''} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Business Email <span className="req">*</span></label>
                          <input name="email" type="email" placeholder="company@email.com" required onChange={handleChange} value={form.email || ''} />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input name="phone" type="tel" placeholder="+44 000 000 0000" onChange={handleChange} value={form.phone || ''} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Industry</label>
                          <select name="industry" onChange={handleChange} value={form.industry || ''}>
                            <option value="">Select industry</option>
                            {industries.map(i => <option key={i} value={i}>{i}</option>)}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Service Required</label>
                          <select name="service" onChange={handleChange} value={form.service || ''}>
                            <option value="">Select service</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="form-group full">
                        <label>Message</label>
                        <textarea name="message" placeholder="Tell us more about your service needs..." rows={5} onChange={handleChange} value={form.message || ''} />
                      </div>
                      <button type="submit" className="btn-primary pill contact-submit-btn">
                        Send Business Enquiry <ArrowRight size={16} />
                      </button>
                    </>
                  )}

                  {activeTab === 'provider' && (
                    <>
                      <h2 className="contact-form-title">Partner With VERSAL AXIS</h2>
                      <p className="contact-form-desc">Apply to join the VERSAL AXIS provider network. We'll review your application and be in touch within 2 business days.</p>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Full Name <span className="req">*</span></label>
                          <input name="name" type="text" placeholder="Your full name" required onChange={handleChange} value={form.name || ''} />
                        </div>
                        <div className="form-group">
                          <label>Company / Business Name <span className="req">*</span></label>
                          <input name="company" type="text" placeholder="Your business name" required onChange={handleChange} value={form.company || ''} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email <span className="req">*</span></label>
                          <input name="email" type="email" placeholder="your@email.com" required onChange={handleChange} value={form.email || ''} />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input name="phone" type="tel" placeholder="+44 000 000 0000" onChange={handleChange} value={form.phone || ''} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Service Category</label>
                          <select name="category" onChange={handleChange} value={form.category || ''}>
                            <option value="">Select category</option>
                            {serviceCategories.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Years of Experience</label>
                          <select name="experience" onChange={handleChange} value={form.experience || ''}>
                            <option value="">Select experience</option>
                            {experienceOptions.map(e => <option key={e} value={e}>{e}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="form-group full">
                        <label>Service Area</label>
                        <input name="area" type="text" placeholder="e.g. Greater London, Manchester, UK Wide" onChange={handleChange} value={form.area || ''} />
                      </div>
                      <div className="form-group full">
                        <label>Message</label>
                        <textarea name="message" placeholder="Tell us about your services, certifications and experience..." rows={5} onChange={handleChange} value={form.message || ''} />
                      </div>
                      <button type="submit" className="btn-primary pill contact-submit-btn">
                        Apply as Service Provider <ArrowRight size={16} />
                      </button>
                    </>
                  )}

                  {activeTab === 'general' && (
                    <>
                      <h2 className="contact-form-title">General Partnerships &amp; Corporate Questions</h2>
                      <p className="contact-form-desc">For general enquiries, partnerships, media or corporate questions — get in touch and we'll respond promptly.</p>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Full Name <span className="req">*</span></label>
                          <input name="name" type="text" placeholder="Your full name" required onChange={handleChange} value={form.name || ''} />
                        </div>
                        <div className="form-group">
                          <label>Email <span className="req">*</span></label>
                          <input name="email" type="email" placeholder="your@email.com" required onChange={handleChange} value={form.email || ''} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input name="phone" type="tel" placeholder="+44 000 000 0000" onChange={handleChange} value={form.phone || ''} />
                        </div>
                        <div className="form-group">
                          <label>Subject</label>
                          <input name="subject" type="text" placeholder="What is your enquiry about?" onChange={handleChange} value={form.subject || ''} />
                        </div>
                      </div>
                      <div className="form-group full">
                        <label>Message</label>
                        <textarea name="message" placeholder="Your message..." rows={6} onChange={handleChange} value={form.message || ''} />
                      </div>
                      <button type="submit" className="btn-primary pill contact-submit-btn">
                        Send Enquiry <ArrowRight size={16} />
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>

            {/* Right — Direct Reach */}
            <div className="contact-reach-col">
              <div className="contact-reach-card">
                <h3 className="reach-heading">Direct Contact Options</h3>
                <p className="reach-desc">Need immediate support or have an urgent commercial requirement? Reach us through any channel below.</p>

                <div className="reach-cards">
                  <a href="mailto:hello@versalaxis.com" className="reach-item">
                    <div className="reach-icon"><Mail size={20} /></div>
                    <div>
                      <span className="reach-item-label">Email Us</span>
                      <span className="reach-item-value">hello@versalaxis.com</span>
                    </div>
                  </a>
                  <a href="tel:+441234567890" className="reach-item">
                    <div className="reach-icon"><Phone size={20} /></div>
                    <div>
                      <span className="reach-item-label">Call Us</span>
                      <span className="reach-item-value">+44 (0) 123 456 7890</span>
                    </div>
                  </a>
                  <a href="#" className="reach-item">
                    <div className="reach-icon"><MessageCircle size={20} /></div>
                    <div>
                      <span className="reach-item-label">WhatsApp / Support</span>
                      <span className="reach-item-value">Available for direct assistance</span>
                    </div>
                  </a>
                </div>

                <div className="reach-response-note">
                  <span className="reach-dot" />
                  Our team typically responds within 1 business day.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
