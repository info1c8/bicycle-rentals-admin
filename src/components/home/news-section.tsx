import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Новые электровелосипеды в нашем парке",
      excerpt: "Пополнили флот современными электровелосипедами премиум-класса с увеличенным запасом хода.",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=400",
      date: "15 марта 2024",
      category: "Новости",
      readTime: "3 мин"
    },
    {
      id: 2,
      title: "Весенние скидки до 30%",
      excerpt: "Специальные предложения на аренду велосипедов в честь начала велосезона.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
      date: "10 марта 2024",
      category: "Акции",
      readTime: "2 мин"
    },
    {
      id: 3,
      title: "Открытие нового пункта проката",
      excerpt: "Теперь наши велосипеды доступны и в районе Новостройки. Удобное расположение и большой выбор.",
      image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&q=80&w=400",
      date: "5 марта 2024",
      category: "Новости",
      readTime: "4 мин"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Новости и события</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Следите за последними новостями и специальными предложениями
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={article.category === "Акции" ? "default" : "secondary"}>
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Icon name="Clock" className="mr-1" size={12} />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.date}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/news/${article.id}`}>
                      Читать далее
                      <Icon name="ArrowRight" className="ml-1" size={14} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/news">
              <Icon name="Newspaper" className="mr-2" size={16} />
              Все новости
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;