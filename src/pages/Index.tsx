import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState('');

  const services = [
    {
      title: 'Уборка квартир',
      description: 'Комплексная уборка жилых помещений любой площади',
      price: 'от 2 500 ₽',
      icon: 'Home',
      basePrice: 2500,
      pricePerSqm: 50
    },
    {
      title: 'Уборка офисов',
      description: 'Профессиональная уборка бизнес-центров и офисных помещений',
      price: 'от 3 000 ₽',
      icon: 'Building2',
      basePrice: 3000,
      pricePerSqm: 55
    },
    {
      title: 'Генеральная уборка',
      description: 'Глубокая очистка всех поверхностей, включая труднодоступные места',
      price: 'от 4 500 ₽',
      icon: 'Sparkles',
      basePrice: 4500,
      pricePerSqm: 80
    },
    {
      title: 'Уборка после ремонта',
      description: 'Удаление строительной пыли и загрязнений после ремонтных работ',
      price: 'от 5 000 ₽',
      icon: 'Hammer',
      basePrice: 5000,
      pricePerSqm: 100
    },
    {
      title: 'Мойка окон',
      description: 'Профессиональная мойка окон с внутренней и внешней стороны',
      price: 'от 150 ₽/м²',
      icon: 'Droplets',
      basePrice: 0,
      pricePerSqm: 150
    },
    {
      title: 'Химчистка мебели',
      description: 'Глубокая очистка мягкой мебели и ковровых покрытий',
      price: 'от 1 500 ₽',
      icon: 'Sofa',
      basePrice: 1500,
      pricePerSqm: 200
    }
  ];

  const calculatePrice = (serviceTitle: string, sqmArea: string, roomsCount: string) => {
    const service = services.find(s => s.title === serviceTitle);
    if (!service || !sqmArea) {
      setCalculatedPrice(0);
      return;
    }

    const areaNum = parseFloat(sqmArea);
    const roomsNum = roomsCount ? parseInt(roomsCount) : 0;
    
    let price = service.basePrice + (areaNum * service.pricePerSqm);
    
    if (roomsNum > 2) {
      price += (roomsNum - 2) * 500;
    }

    setCalculatedPrice(Math.round(price));
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    calculatePrice(value, area, rooms);
  };

  const handleAreaChange = (value: string) => {
    setArea(value);
    calculatePrice(selectedService, value, rooms);
  };

  const handleRoomsChange = (value: string) => {
    setRooms(value);
    calculatePrice(selectedService, area, value);
  };

  const handleSubmitOrder = () => {
    alert(`Спасибо, ${name}! Ваша заявка принята.\n\nУслуга: ${selectedService}\nПлощадь: ${area} м²\nКомнат: ${rooms}\nСтоимость: ${calculatedPrice.toLocaleString()} ₽\n\nМы свяжемся с вами по телефону ${phone} в ближайшее время.`);
    setOrderDialogOpen(false);
    setSelectedService('');
    setArea('');
    setRooms('');
    setCalculatedPrice(0);
    setName('');
    setPhone('');
    setAddress('');
    setComments('');
  };

  const portfolio = [
    {
      title: 'Чистка плиты',
      area: 'До и после',
      image: 'https://cdn.poehali.dev/files/389e0be7-d5c2-4e18-98dc-c44763946602.jpg'
    },
    {
      title: 'Чистка духовки',
      area: 'До и после',
      image: 'https://cdn.poehali.dev/files/716c138e-4c8c-4c38-be43-e8872facc563.jpg'
    },
    {
      title: 'Уборка ванной',
      area: 'До и после',
      image: 'https://cdn.poehali.dev/files/a2adb74a-be0a-4d5e-aabe-5bf42eae0ef6.jpg'
    }
  ];

  const reviews = [
    {
      name: 'Елена Петрова',
      rating: 5,
      text: 'Превосходное качество уборки! Ребята приехали точно вовремя, работали аккуратно и быстро. Квартира сияет чистотой.',
      date: '15 октября 2024'
    },
    {
      name: 'Михаил Соколов',
      rating: 5,
      text: 'Заказываем регулярную уборку офиса уже полгода. Всегда идеальный результат, вежливый персонал. Рекомендую!',
      date: '8 октября 2024'
    },
    {
      name: 'Анна Кузнецова',
      rating: 5,
      text: 'После ремонта в квартире был настоящий хаос. TOP CLEAN справились за один день! Теперь только к вам обращаемся.',
      date: '2 октября 2024'
    }
  ];

  const faqs = [
    {
      question: 'Какие средства вы используете для уборки?',
      answer: 'Мы используем только профессиональные сертифицированные средства от ведущих производителей. Все средства безопасны для людей и животных, гипоаллергенны и экологичны.'
    },
    {
      question: 'Сколько времени занимает уборка?',
      answer: 'Время уборки зависит от площади и типа помещения. Стандартная уборка квартиры 50-70 м² занимает около 3-4 часов. Точное время мы сообщаем при оформлении заказа.'
    },
    {
      question: 'Нужно ли мне присутствовать во время уборки?',
      answer: 'Ваше присутствие не обязательно. Многие наши клиенты предоставляют доступ в помещение и занимаются своими делами. Мы гарантируем безопасность и конфиденциальность.'
    },
    {
      question: 'Какие гарантии вы предоставляете?',
      answer: 'Мы предоставляем гарантию качества на все виды работ. Если вас что-то не устроит, мы бесплатно устраним недочеты в течение 24 часов.'
    },
    {
      question: 'Как происходит оплата?',
      answer: 'Оплата производится после выполнения работ. Принимаем наличные, банковские карты и безналичный расчет для юридических лиц.'
    }
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-accent" size={28} />
            <span className="text-2xl font-bold text-primary">TOP CLEAN</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground hover:text-accent transition-colors">Услуги</a>
            <a href="#portfolio" className="text-foreground hover:text-accent transition-colors">Портфолио</a>
            <a href="#reviews" className="text-foreground hover:text-accent transition-colors">Отзывы</a>
            <a href="#faq" className="text-foreground hover:text-accent transition-colors">FAQ</a>
            <a href="#contacts" className="text-foreground hover:text-accent transition-colors">Контакты</a>
          </div>
          <Button 
            onClick={() => setOrderDialogOpen(true)}
            className="bg-accent hover:bg-accent/90 text-primary font-semibold"
          >
            Заказать уборку
          </Button>
        </nav>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
              Премиальный клининг в Перми
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary leading-tight">
              Идеальная чистота<br />вашего пространства
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Профессиональные услуги клининга для дома и бизнеса.<br />
              Качество, которому доверяют более 2000 клиентов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-8">
                <Icon name="Phone" className="mr-2" size={20} />
                Позвонить сейчас
              </Button>
              <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg px-8">
                    Рассчитать стоимость
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Заказать уборку</DialogTitle>
                    <DialogDescription>
                      Выберите услугу и укажите параметры для расчёта стоимости
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="service">Тип услуги *</Label>
                      <Select value={selectedService} onValueChange={handleServiceChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service, index) => (
                            <SelectItem key={index} value={service.title}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">Площадь (м²) *</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="Например, 65"
                          value={area}
                          onChange={(e) => handleAreaChange(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rooms">Количество комнат</Label>
                        <Input
                          id="rooms"
                          type="number"
                          placeholder="Например, 3"
                          value={rooms}
                          onChange={(e) => handleRoomsChange(e.target.value)}
                        />
                      </div>
                    </div>

                    {calculatedPrice > 0 && (
                      <Card className="bg-accent/10 border-accent/20">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">Предварительная стоимость</p>
                            <p className="text-4xl font-bold text-accent">{calculatedPrice.toLocaleString()} ₽</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="border-t pt-6 space-y-4">
                      <h4 className="font-semibold text-lg">Контактные данные</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя *</Label>
                        <Input
                          id="name"
                          placeholder="Как к вам обращаться?"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                          id="address"
                          placeholder="Улица, дом, квартира"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments">Комментарий</Label>
                        <Textarea
                          id="comments"
                          placeholder="Дополнительные пожелания..."
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleSubmitOrder}
                      disabled={!selectedService || !area || !name || !phone}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold text-lg py-6"
                      size="lg"
                    >
                      Оформить заказ
                      {calculatedPrice > 0 && ` за ${calculatedPrice.toLocaleString()} ₽`}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Полный спектр клининговых услуг</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                <CardHeader>
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-accent" size={28} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Наши работы</h2>
            <p className="text-xl text-muted-foreground">Примеры выполненных проектов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolio.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Maximize2" size={16} />
                    {item.area}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Нам доверяют тысячи людей</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground/80">
                    "{review.text}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">Ответы на популярные вопросы</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-none shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold hover:text-accent hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Контакты</h2>
            <p className="text-xl text-muted-foreground">Свяжитесь с нами удобным способом</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon name="MapPin" className="text-accent" size={24} />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">г. Пермь</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon name="Phone" className="text-accent" size={24} />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">+7 (919) 707-12-18</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon name="Mail" className="text-accent" size={24} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">info@topclean-perm.ru</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon name="Clock" className="text-accent" size={24} />
                    Режим работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">Ежедневно с 8:00 до 22:00</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-primary text-white border-none">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Готовы к идеальной чистоте?</CardTitle>
                <CardDescription className="text-white/80 text-lg">
                  Закажите уборку прямо сейчас и получите скидку 10% на первый заказ
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button 
                  onClick={() => setOrderDialogOpen(true)}
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold text-lg px-10"
                >
                  Заказать со скидкой
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-accent" size={28} />
              <span className="text-2xl font-bold">TOP CLEAN service</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/80">© 2024 TOP CLEAN service. Все права защищены.</p>
              <p className="text-white/60 mt-2">Пермь, Россия</p>
            </div>
          </div>
        </div>
      </footer>

      {chatOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-2xl z-50 animate-scale-in">
          <CardHeader className="bg-primary text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon name="MessageCircle" size={24} />
                Онлайн-консультант
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-96 flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                <p className="text-sm">Здравствуйте! Я онлайн-консультант TOP CLEAN service. Чем могу помочь?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Напишите ваш вопрос..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent hover:bg-accent/90 text-primary">
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-primary shadow-2xl z-50 animate-scale-in"
      >
        <Icon name={chatOpen ? "X" : "MessageCircle"} size={28} />
      </Button>
    </div>
  );
};

export default Index;