import { useEffect } from 'react';
import { ArrowRight, Heart, TrendingUp, Globe, Zap, Coffee, Users } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';

const openRoles = [
  { title: 'Senior Product Manager', dept: 'Product', location: 'London, UK', type: 'Full-time' },
  { title: 'Platform Engineer (Backend)', dept: 'Engineering', location: 'Remote (UK)', type: 'Full-time' },
  { title: 'Frontend Engineer', dept: 'Engineering', location: 'London / Remote', type: 'Full-time' },
  { title: 'Operations Manager', dept: 'Operations', location: 'Manchester, UK', type: 'Full-time' },
  { title: 'Provider Partnerships Lead', dept: 'Partnerships', location: 'London, UK', type: 'Full-time' },
  { title: 'Business Development Manager', dept: 'Sales', location: 'UK Wide', type: 'Full-time' },
  { title: 'Customer Success Manager', dept: 'Customer Success', location: 'Remote (UK)', type: 'Full-time' },
  { title: 'Marketing Manager', dept: 'Marketing', location: 'London, UK', type: 'Full-time' },
];

const deptColors: Record<string, string> = {
  Product: '#10B981',
  Engineering: '#3B82F6',
  Operations: '#8B5CF6',
  Partnerships: '#F59E0B',
  Sales: '#EC4899',
  'Customer Success': '#14B8A6',
  Marketing: '#6366F1',
};

const culturePoints = [
  { icon: Heart, title: 'Mission-Driven', desc: 'We\'re building the future of service management — work that creates real impact for businesses and service professionals across the UK.' },
  { icon: TrendingUp, title: 'Growth-Oriented', desc: 'VERSAL AXIS is scaling fast. Every team member has the opportunity to grow with the company and take on increased responsibility.' },
  { icon: Globe, title: 'Distributed First', desc: 'We operate with flexibility. Many of our roles are remote-friendly, enabling the best talent regardless of location.' },
  { icon: Zap, title: 'Move Fast', desc: 'We build, ship and iterate quickly. Ideas that work get implemented. We value action over endless planning.' },
];

const perks = [
  { icon: Coffee, title: 'Competitive Salary', desc: 'Market-leading compensation packages benchmarked annually.' },
  { icon: Globe, title: 'Flexible Working', desc: 'Remote and hybrid options for most roles. Your best work matters more than your location.' },
  { icon: TrendingUp, title: 'Stock Options', desc: 'Share in the value we create together — equity available for all full-time roles.' },
  { icon: Heart, title: 'Health Benefits', desc: 'Comprehensive health and dental coverage for you and your family.' },
  { icon: Users, title: 'Team Events', desc: 'Regular off-sites, socials and team-building events across the year.' },
  { icon: Zap, title: 'Learning Budget', desc: 'Annual professional development budget for courses, conferences and books.' },
];

export function CareersPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="inner-hero-section careers-hero">
        <div className="inner-hero-bg" />
        <div className="container inner-hero-content">
          <span className="kicker light">JOIN THE TEAM</span>
          <h1 className="inner-hero-title">Build the Future of<br />Service Operations.</h1>
          <p className="inner-hero-subtitle">
            VERSAL AXIS is on a mission to transform how businesses manage services. Join a team building something meaningful.
          </p>
          <div className="hero-actions" style={{ marginTop: 32 }}>
            <a href="#open-roles" className="btn-primary dark-pill">View Open Roles</a>
            <a href="mailto:careers@versalaxis.com" className="btn-ghost light-link">Send Your CV <ArrowRight size={16} style={{ display: 'inline', marginLeft: 4 }} /></a>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="OUR CULTURE" title="What it's like to work at VERSAL AXIS." subtitle="We're a team of builders, operators and problem-solvers — united by a shared mission." />
          <div className="culture-grid">
            {culturePoints.map(c => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="culture-card">
                  <div className="culture-icon"><Icon size={24} color="#10B981" /></div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="page-section bg-cream-2" id="open-roles">
        <div className="container">
          <SectionHeading kicker="OPEN POSITIONS" title="Current opportunities." subtitle="Join us in building the VERSAL AXIS platform and team." />
          <div className="roles-list">
            {openRoles.map(role => (
              <div key={role.title} className="role-card">
                <div className="role-card-left">
                  <span className="role-dept-badge" style={{ color: deptColors[role.dept] || '#10B981', background: `${deptColors[role.dept] || '#10B981'}15` }}>{role.dept}</span>
                  <h3 className="role-title">{role.title}</h3>
                  <div className="role-meta">
                    <span>{role.location}</span>
                    <span className="role-meta-dot">·</span>
                    <span>{role.type}</span>
                  </div>
                </div>
                <a href="mailto:careers@versalaxis.com" className="btn-primary pill role-apply-btn">Apply Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="page-section bg-cream">
        <div className="container">
          <SectionHeading kicker="BENEFITS" title="What we offer." />
          <div className="perks-grid">
            {perks.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="perk-card">
                  <div className="perk-icon"><Icon size={22} color="#10B981" /></div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-cta-section">
        <div className="container">
          <div className="inner-cta-block">
            <h2 className="inner-cta-title">Don't see the right role?</h2>
            <p className="inner-cta-sub">We're always looking for exceptional people. Send us your CV and tell us how you'd contribute to VERSAL AXIS.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href="mailto:careers@versalaxis.com" className="btn-primary pill">Send Your CV</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
