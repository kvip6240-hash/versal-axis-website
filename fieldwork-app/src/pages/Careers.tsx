import { useEffect, useState } from 'react';
import { ArrowRight, Heart, TrendingUp, Globe, Zap, Coffee, Users, X } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';

type Role = {
  title: string;
  dept: string;
  location?: string;
  type?: string;
  company?: string;
  workLocation?: string;
  hours?: string;
  summary?: string;
  responsibilities?: string[];
  skills?: string[];
};

const openRoles: Role[] = [
  {
    title: 'Business Project Manager', dept: 'Business and Financial Project Management', company: 'VERSALAXIS LIMITED', workLocation: 'Hybrid', hours: '20 hrs',
    summary: 'Plan and deliver business projects, manage budgets and resources, coordinate teams, monitor risks, and ensure projects meet agreed objectives and deadlines.',
    responsibilities: ['Define project objectives, scope, and expected benefits.', 'Develop project plans, milestones, and resource schedules.', 'Manage budgets, costs, and spending forecasts.', 'Coordinate teams, stakeholders, and external suppliers.', 'Monitor risks, issues, dependencies, and project changes.', 'Prepare progress reports and coordinate project handovers.'],
    skills: ['Experience managing business projects and budgets.', 'Strong analytical, organizational, and communication skills.', 'Proficiency in spreadsheets and project planning tools.', 'Relevant qualification or equivalent professional experience.', 'Project management certification is desirable.'],
  },
  {
    title: 'Public Relations Officer', dept: 'Public Relations and Corporate Communications', company: 'VERSALAXIS LIMITED', workLocation: 'Hybrid', hours: '20 hrs',
    summary: 'Manage public relations activities, maintain the company’s public image, build media relationships, and coordinate accurate external communications.',
    responsibilities: ['Develop public relations and communications plans.', 'Write and edit press releases, statements, and website news.', 'Build relationships with journalists and external organizations.', 'Handle media enquiries and coordinate interviews.', 'Plan PR campaigns, events, and communications schedules.', 'Manage public-facing social media communications.', 'Monitor media coverage, public feedback, and reputation risks.', 'Prepare communications reports and evaluate campaign results.'],
    skills: ['Strong written and spoken English.', 'Excellent writing and editorial judgment.', 'Experience in PR or corporate communications.', 'Professional relationship-building skills.', 'Familiarity with social media publishing and media monitoring tools.', 'Relevant qualification or equivalent professional experience.'],
  },
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

const applicationEmailUrl = (role: Role) => {
  const subject = `Application for ${role.title}`;
  const body = `Dear VERSALAXIS Recruitment Team,\n\nI would like to apply for the ${role.title} position.\n\nName:\nPhone number:\n\nPlease find my CV attached.\n\nKind regards,`;
  return `https://mail.google.com/mail/?view=cm&fs=1&to=vignesh%40versalaxis.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedRole(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

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
                  {role.summary ? <><p className="role-summary">{role.summary}</p><div className="role-meta"><span>{role.company}</span><span className="role-meta-dot">·</span><span>{role.workLocation}</span><span className="role-meta-dot">·</span><span>{role.hours}</span></div></> : <div className="role-meta"><span>{role.location}</span><span className="role-meta-dot">·</span><span>{role.type}</span></div>}
                </div>
                {role.summary ? <div className="role-actions"><button type="button" className="role-details-btn" onClick={() => setSelectedRole(role)}>View Details</button><a href={applicationEmailUrl(role)} target="_blank" rel="noreferrer" className="btn-primary pill role-apply-btn">Apply Now</a></div> : <a href={applicationEmailUrl(role)} target="_blank" rel="noreferrer" className="btn-primary pill role-apply-btn">Apply Now</a>}
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
      {selectedRole && <div className="role-modal-backdrop" role="presentation" onMouseDown={() => setSelectedRole(null)}><section className="role-modal" role="dialog" aria-modal="true" aria-labelledby="role-modal-title" onMouseDown={event => event.stopPropagation()}><button type="button" className="role-modal-close" onClick={() => setSelectedRole(null)} aria-label="Close job details"><X size={20} /></button><span className="role-dept-badge" style={{ color: deptColors[selectedRole.dept] || '#10B981', background: `${deptColors[selectedRole.dept] || '#10B981'}15` }}>{selectedRole.dept}</span><h2 id="role-modal-title">{selectedRole.title}</h2><p className="role-modal-company">{selectedRole.company} · {selectedRole.workLocation} · {selectedRole.hours}</p><p>{selectedRole.summary}</p><h3>Key Responsibilities</h3><ul>{selectedRole.responsibilities?.map(item => <li key={item}>{item}</li>)}</ul><h3>Required Skills</h3><ul>{selectedRole.skills?.map(item => <li key={item}>{item}</li>)}</ul><a href={applicationEmailUrl(selectedRole)} target="_blank" rel="noreferrer" className="btn-primary pill role-modal-apply">Apply Now <ArrowRight size={16} /></a></section></div>}
    </div>
  );
}
