"use client";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  title: string;
  features: Feature[];
}

export default function ServiceFeatures({ title, features }: ServiceFeaturesProps) {
  return (
    <section className="w-full bg-white px-6 sm:px-8 md:px-10 lg:px-14 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <p className="text-[#6A9F30] text-xs uppercase tracking-widest mb-3 md:mb-4">
            KEY FEATURES
          </p>
          <h2 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4 md:mb-6">
            Why Choose {title} MPS?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#e8e6e1] p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-black text-lg md:text-xl font-bold uppercase tracking-tight mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
