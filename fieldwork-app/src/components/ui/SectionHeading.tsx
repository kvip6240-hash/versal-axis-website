interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

export function SectionHeading({ kicker, title, subtitle, align = 'center', light = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`section-head-${align} ${className}`} style={{ textAlign: align }}>
      {kicker && <span className={`kicker${light ? ' light' : ''}`}>{kicker}</span>}
      <h2 className={`section-title${light ? ' light' : ''}`}>{title}</h2>
      {subtitle && <p className={`section-subtitle${light ? ' light' : ''}`}>{subtitle}</p>}
    </div>
  );
}
