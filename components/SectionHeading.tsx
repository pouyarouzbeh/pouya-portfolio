type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({ kicker, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`section-heading select-text ${className}`}>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title-premium">{title}</h2>
      {description ? <p className="section-description-premium">{description}</p> : null}
    </div>
  );
}
