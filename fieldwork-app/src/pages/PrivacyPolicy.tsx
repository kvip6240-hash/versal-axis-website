import { Mail, ShieldCheck } from 'lucide-react';

const sections = [
  {
    id: 'overview',
    number: '01',
    title: 'Overview & GDPR Compliance',
    content: <>
      <p>This Privacy Policy sets out how VERSAL AXIS Platform Ltd (&quot;VERSAL AXIS&quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, stores, and protects personal and business information obtained through our property service management platform and website.</p>
      <p>We act as a Data Controller in respect of personal data collected under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
    </>,
  },
  {
    id: 'information', number: '02', title: 'Information We Collect', content: <>
      <p>We collect information necessary to coordinate property maintenance services and maintain account administration:</p>
      <ul>
        <li><strong>Account Data:</strong> Name, work email address, telephone number, business name, position, and portal login credentials.</li>
        <li><strong>Property &amp; Request Data:</strong> Site addresses, access instructions, maintenance requirements, photo uploads, and service logs.</li>
        <li><strong>Financial &amp; Payment Data:</strong> Bank account details, transaction IDs, payment statuses, and VAT/billing records (processed via PCI-DSS compliant providers).</li>
        <li><strong>Technical &amp; Usage Data:</strong> IP address, browser type, device information, operating system, and platform usage telemetry.</li>
      </ul>
    </>,
  },
  {
    id: 'use', number: '03', title: 'How We Use Information', content: <>
      <p>Your information is processed strictly for legitimate business purposes and contract performance:</p>
      <ul>
        <li>Matching service requests with appropriate verified service providers.</li>
        <li>Facilitating job tracking, quotation presentation, and completion sign-offs.</li>
        <li>Processing upfront and balance payments and issuing digital invoices.</li>
        <li>Sending critical operational notifications, job status alerts, and security updates.</li>
        <li>Maintaining audit trails, compliance documentation, and resolving service disputes.</li>
      </ul>
    </>,
  },
  {
    id: 'sharing', number: '04', title: 'Data Sharing & Third Parties', content: <>
      <p>We do not sell or rent personal data to third parties. We share data only with verified parties essential for service delivery:</p>
      <p><strong>Authorized Recipients:</strong></p>
      <ul>
        <li><strong>Verified Service Providers:</strong> Shared only with providers assigned to perform work at your specified site (name, site address, access notes, contact phone).</li>
        <li><strong>Payment &amp; Banking Partners:</strong> Secure payment gateways for processing upfront and balance payments.</li>
        <li><strong>Cloud &amp; Infrastructure Providers:</strong> ISO 27001-certified UK/EU cloud hosting partners.</li>
      </ul>
    </>,
  },
  {
    id: 'security', number: '05', title: 'Data Security & Storage', content: <>
      <p>We implement robust technical and organizational security measures to prevent unauthorized access, loss, or alteration of data. All data transmission is encrypted using TLS 1.3/SSL encryption, and stored data is encrypted at rest.</p>
      <p>Access to user data within VERSAL AXIS is strictly role-based and restricted to authorized personnel who require access for operational support.</p>
    </>,
  },
  {
    id: 'retention', number: '06', title: 'Data Retention', content: <p>We retain personal and project data for as long as your account remains active or as needed to fulfill service commitments. Financial and transaction records are retained for 7 years to satisfy UK HMRC tax and statutory compliance requirements.</p>,
  },
  {
    id: 'rights', number: '07', title: 'Your Legal Rights', content: <>
      <p>Under UK GDPR, you have the following data rights:</p>
      <ul>
        <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
        <li><strong>Right to Rectification:</strong> Request correction of incomplete or inaccurate data.</li>
        <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your personal data where retention is no longer required by law.</li>
        <li><strong>Right to Restriction:</strong> Request restriction of data processing in specific circumstances.</li>
        <li><strong>Right to Data Portability:</strong> Obtain your data in a structured, machine-readable format.</li>
      </ul>
    </>,
  },
  {
    id: 'enquiries', number: '08', title: 'Data Protection Enquiries', content: <>
      <p>If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact our Data Protection Officer at:</p>
      <div className="privacy-contact-card">
        <ShieldCheck size={22} />
        <address><strong>VERSAL AXIS Data Protection Office</strong><br /><a href="mailto:privacy@versalaxis.com"><Mail size={15} /> privacy@versalaxis.com</a><br />VERSAL AXIS Platform Ltd, Deansgate Tower, Manchester, M3 2BW, UK</address>
      </div>
    </>,
  },
];

export function PrivacyPolicyPage() {
  return <main className="privacy-page">
    <section className="inner-hero-section privacy-hero">
      <div className="inner-hero-bg" />
      <div className="container inner-hero-content">
        <span className="kicker light">LEGAL &amp; PRIVACY</span>
        <h1 className="inner-hero-title">Privacy Policy</h1>
        <p className="inner-hero-subtitle">VERSAL AXIS is committed to protecting your privacy and ensuring your personal and business data is handled securely and transparently.</p>
      </div>
    </section>
    <section className="privacy-content-section">
      <div className="container privacy-layout">
        <aside className="privacy-toc"><h2>Table of Contents</h2>{sections.map(section => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.title}</a>)}</aside>
        <div className="privacy-sections">{sections.map(section => <article id={section.id} className="privacy-section" key={section.id}><span className="privacy-section-number">Section {section.number}</span><h2>{section.title}</h2>{section.content}</article>)}</div>
      </div>
    </section>
  </main>;
}
