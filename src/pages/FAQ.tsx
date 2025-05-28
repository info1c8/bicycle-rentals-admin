import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface FAQCategory {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

const faqData: FAQCategory[] = [
  {
    id: "general",
    title: "Общие вопросы",
    questions: [
      {
        id: "q1",
        question: "Как арендовать велосипед?",
        answer: "Чтобы арендовать велосипед, выберите подходящую модель в каталоге, укажите период аренды и оформите заказ онлайн. После этого вы можете забрать велосипед в пункте проката или заказать доставку."
      },
      {
        id: "q2",
        question: "Какие документы нужны для аренды?",
        answer: "Для аренды велосипеда необходим паспорт или водительское удостоверение. Также потребуется внести залог, который возвращается после возврата велосипеда."
      },
      {
        id: "q3",
        question: "Можно ли арендовать велосипед без залога?",
        answer: "Нет, залог является обязательным условием аренды. Это может быть документ или денежная сумма, размер которой зависит от модели велосипеда."
      }
    ]
  },
  {
    id: "payment",
    title: "Оплата и цены",
    questions: [
      {
        id: "q4",
        question: "Какие способы оплаты вы принимаете?",
        answer: "Мы принимаем оплату наличными, банковскими картами (Visa, MasterCard, МИР) и через онлайн-платежи. Также доступна оплата по QR-коду."
      },
      {
        id: "q5",
        question: "Есть ли система скидок?",
        answer: "Да, мы предоставляем скидки при длительной аренде, для постоянных клиентов и при групповой аренде. Также регулярно проводим акции и специальные предложения."
      },
      {
        id: "q6",
        question: "Как рассчитывается стоимость аренды?",
        answer: "Стоимость аренды зависит от модели велосипеда и длительности проката. Цены указаны за час, также доступны специальные тарифы на сутки и неделю."
      }
    ]
  },
  {
    id: "technical",
    title: "Технические вопросы",
    questions: [
      {
        id: "q7",
        question: "Что делать, если велосипед сломался?",
        answer: "В случае поломки немедленно свяжитесь с нами по телефону поддержки. Мы организуем ремонт или замену велосипеда в кратчайшие сроки."
      },
      {
        id: "q8",
        question: "Проводится ли проверка велосипедов?",
        answer: "Да, все велосипеды проходят регулярное техническое обслуживание и проверку перед каждой арендой. Мы гарантируем их исправность и безопасность."
      },
      {
        id: "q9",
        question: "Предоставляете ли вы защитную экипировку?",
        answer: "Да, мы предоставляем шлемы и замки бесплатно. Также доступна аренда дополнительного оборудования: фонарей, держателей для телефона и детских кресел."
      }
    ]
  },
  {
    id: "rules",
    title: "Правила и условия",
    questions: [
      {
        id: "q10",
        question: "Каковы правила возврата велосипеда?",
        answer: "Велосипед необходимо вернуть в пункт проката в оговоренное время в исходном состоянии. При задержке может взиматься дополнительная плата."
      },
      {
        id: "q11",
        question: "Что включено в страховку?",
        answer: "Базовая страховка включена в стоимость аренды и покрывает случайные повреждения. Дополнительно можно оформить расширенную страховку."
      },
      {
        id: "q12",
        question: "Можно ли продлить аренду?",
        answer: "Да, аренду можно продлить, предварительно уведомив нас. Рекомендуем сообщать о продлении не менее чем за 2 часа до окончания текущего срока."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Фильтрация вопросов
  const filteredCategories = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    activeCategory === "all" || category.id === activeCategory
  );

  // Общее количество вопросов
  const totalQuestions = faqData.reduce((acc, category) => acc + category.questions.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h1>
              <p className="text-lg text-white/80 mb-8">
                Найдите ответы на самые популярные вопросы о нашем сервисе
              </p>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Поиск по вопросам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Icon
                  name="Search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={16}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Категории */}
              <div className="md:w-1/4">
                <div className="sticky top-4 space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Категории</h2>
                  <div className="space-y-2">
                    <Button
                      variant={activeCategory === "all" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveCategory("all")}
                    >
                      <Icon name="LayoutGrid" className="mr-2" size={16} />
                      Все вопросы
                      <span className="ml-auto text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {totalQuestions}
                      </span>
                    </Button>
                    {faqData.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.title}
                        <span className="ml-auto text-xs bg-primary/10 px-2 py-1 rounded-full">
                          {category.questions.length}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Вопросы и ответы */}
              <div className="md:w-3/4">
                {filteredCategories.map((category) => (
                  category.questions.length > 0 && (
                    <div key={category.id} className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.questions.map((item) => (
                          <AccordionItem key={item.id} value={item.id} className="border rounded-lg">
                            <AccordionTrigger className="px-4 hover:no-underline">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <p className="text-gray-600">{item.answer}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )
                ))}

                {filteredCategories.every(category => category.questions.length === 0) && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon name="Search" className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                    <p className="text-gray-600 mb-4">
                      По вашему запросу не найдено подходящих вопросов
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Сбросить поиск
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
              <p className="text-gray-600 mb-8">
                Свяжитесь с нами, и мы с радостью поможем вам с любым вопросом
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contacts">
                    <Icon name="Mail" className="mr-2" size={16} />
                    Написать нам
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+78001234567">
                    <Icon name="Phone" className="mr-2" size={16} />
                    +7 (800) 123-45-67
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;