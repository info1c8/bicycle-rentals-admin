import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  social: {
    email?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Александр Петров",
    position: "Генеральный директор",
    image: "https://i.pravatar.cc/300?img=11",
    bio: "Основатель компании и опытный велосипедист с 15-летним стажем. Отвечает за стратегическое развитие и общее руководство компанией.",
    social: {
      email: "alex@velorent.ru",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 2,
    name: "Мария Иванова",
    position: "Менеджер по работе с клиентами",
    image: "https://i.pravatar.cc/300?img=5",
    bio: "Профессионал в области клиентского сервиса. Обеспечивает высокий уровень обслуживания и помогает клиентам с выбором велосипедов.",
    social: {
      email: "maria@velorent.ru",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 3,
    name: "Дмитрий Сидоров",
    position: "Технический специалист",
    image: "https://i.pravatar.cc/300?img=12",
    bio: "Сертифицированный механик с опытом работы более 8 лет. Отвечает за техническое обслуживание и ремонт велосипедов.",
    social: {
      email: "dmitry@velorent.ru",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 4,
    name: "Анна Козлова",
    position: "Маркетолог",
    image: "https://i.pravatar.cc/300?img=9",
    bio: "Специалист по digital-маркетингу. Развивает онлайн-присутствие компании и привлекает новых клиентов.",
    social: {
      email: "anna@velorent.ru",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 5,
    name: "Максим Волков",
    position: "Инструктор",
    image: "https://i.pravatar.cc/300?img=15",
    bio: "Профессиональный велосипедист и инструктор. Проводит обучающие занятия и консультирует по выбору маршрутов.",
    social: {
      email: "maxim@velorent.ru",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 6,
    name: "Елена Морозова",
    position: "Администратор",
    image: "https://i.pravatar.cc/300?img=6",
    bio: "Отвечает за координацию работы офиса и документооборот. Помогает клиентам с оформлением заказов.",
    social: {
      email: "elena@velorent.ru",
      linkedin: "https://linkedin.com"
    }
  }
];

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Наша команда</h1>
              <p className="text-lg text-white/80">
                Познакомьтесь с профессионалами, которые делают ваш отдых незабываемым
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex gap-2">
                      {member.social.email && (
                        <Button variant="outline" size="icon">
                          <Icon name="Mail" size={18} />
                        </Button>
                      )}
                      {member.social.linkedin && (
                        <Button variant="outline" size="icon">
                          <Icon name="Linkedin" size={18} />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="outline" size="icon">
                          <Icon name="Twitter" size={18} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к команде</h2>
              <p className="text-gray-600 mb-8">
                Мы всегда в поиске талантливых и увлеченных велоспортом людей. 
                Если вы разделяете наши ценности и хотите стать частью команды, 
                отправьте нам свое резюме.
              </p>
              <Button size="lg" asChild>
                <Link to="/contacts">
                  <Icon name="Send" className="mr-2" size={16} />
                  Отправить резюме
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;