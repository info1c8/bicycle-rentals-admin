const PartnersSection = () => {
  const partners = [
    {
      name: "Trek",
      logo: "https://via.placeholder.com/120x60/2563eb/ffffff?text=TREK",
      description: "Официальный партнер"
    },
    {
      name: "Giant",
      logo: "https://via.placeholder.com/120x60/059669/ffffff?text=GIANT",
      description: "Поставщик велосипедов"
    },
    {
      name: "Specialized",
      logo: "https://via.placeholder.com/120x60/dc2626/ffffff?text=SPECIALIZED",
      description: "Премиум партнер"
    },
    {
      name: "Cannondale",
      logo: "https://via.placeholder.com/120x60/7c3aed/ffffff?text=CANNONDALE",
      description: "Технический партнер"
    },
    {
      name: "Scott",
      logo: "https://via.placeholder.com/120x60/ea580c/ffffff?text=SCOTT",
      description: "Спортивный партнер"
    },
    {
      name: "Merida",
      logo: "https://via.placeholder.com/120x60/0891b2/ffffff?text=MERIDA",
      description: "Стратегический партнер"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши партнеры</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы сотрудничаем с ведущими производителями велосипедов
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow mb-3 group-hover:scale-105 transition-transform">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-12 object-contain"
                />
              </div>
              <div className="text-sm font-medium">{partner.name}</div>
              <div className="text-xs text-gray-500">{partner.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;