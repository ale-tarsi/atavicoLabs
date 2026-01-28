'use client';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const isCentered = align === 'center';

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex flex-col gap-3 max-w-3xl ${isCentered ? 'mx-auto items-center text-center' : 'items-start text-left'}`}>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-[32px] lg:text-[40px] font-medium text-sabbia leading-[1.1]">
          {title}
        </h2>
        {subtitle && (
          <p className={`text-[15px] lg:text-[17px] leading-[1.65] text-sabbia/75 font-light ${isCentered ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
