"use client";

interface Stat {
  value: string;
  label: string;
}

interface ServiceStatsProps {
  stats: Stat[];
}

export default function ServiceStats({ stats }: ServiceStatsProps) {
  return (
    <section className="w-full bg-[#6A9F30] px-6 sm:px-8 md:px-10 lg:px-14 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-2">{stat.value}</p>
            <p className="text-white/90 text-xs md:text-sm uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
