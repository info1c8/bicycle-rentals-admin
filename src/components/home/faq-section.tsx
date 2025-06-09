import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const faqs = [
    {
      question: "Как арендовать велосипед?",
      answer: "Выберите велосипед в каталоге, укажите период аренды и оформите заказ онлайн. После этого заберите велосипед в пункте проката или закажите доставку."
    },
    {
      question: "Какие документы нужны?",
      answer: "Для аренды необходим паспорт или водительское удостоверение. Также потребуется внести залог."
    },
    {
      question: "Сколько стоит аренда?",
      answer: "Стоимость зависит от модели велосипеда и длительности аренды. Цены начинаются от 200₽ за час."
    },
    {
      question: "Есть ли доставка?",
      answer: "Да, мы доставляем велосипеды по городу. Доставка бесплатна при заказе от 2000₽."
    },
    {
      question: "Что делать при поломке?",
      answer: "Немедленно свяжитесь с нами по телефону поддержки. Мы организуем ремонт или замену велосипеда."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-gray-600">
              Ответы на самые популярные вопросы о нашем сервисе
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                <AccordionTrigger className="px-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Не нашли ответ на свой вопрос?</p>
            <Button asChild>
              <Link to="/faq">
                <Icon name="HelpCircle" className="mr-2" size={16} />
                Посмотреть все вопросы
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;