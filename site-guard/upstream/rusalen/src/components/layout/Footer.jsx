import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';

const footerNav = [
  { title: 'Центр', links: [
    { label: 'Кто мы', path: '/about' },
    { label: 'Команда', path: '/about/team' },
    { label: 'Новости', path: '/about/news' },
    { label: 'Вакансии', path: '/about/vacancies' },
    { label: 'Документы', path: '/about/documents' },
  ]},
  { title: 'Деятельность', links: [
    { label: 'Научная деятельность', path: '/science' },
    { label: 'Образование', path: '/education' },
    { label: 'PsyPedia', path: '/psypedia' },
    { label: 'PsyMedia', path: '/psymedia' },
  ]},
  { title: 'Экосистема', links: [
    { label: 'PsyTorg', path: '/psytorg' },
    { label: 'PsyPay', path: '/psypay' },
    { label: 'PsyTech', path: '/psytech' },
    { label: 'Psyty', path: '/psyty' },
    { label: 'Контакты', path: '/contacts' },
  ]},
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-border bg-[hsl(220,18%,5%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Manifesto */}
          <div className="col-span-2 lg:col-span-2 space-y-3">
            <Link to="/" className="inline-block mb-1">
              <Logo className="h-24 -ml-6" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Адрес: 123610, Московская область, Солнечногорский район, ГП ОПХ ЦМИС, Озеро Сенеж.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+7 (495) 181-5650</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@rusalencenter.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-mono text-sm">@</span>
                <span>Социальные медиа: @Rusalen_Center</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-lg font-semibold mb-1">Подпишитесь на новости</h4>
              <p className="text-sm text-muted-foreground">Получайте актуальные новости, анонсы и исследования РУСАЛЕН</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              {subscribed ? (
                <p className="text-sm text-accent">Вы успешно подписались!</p>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary border-border w-full md:w-64"
                  />
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/80 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-6 border-t border-border space-y-2">
          <p className="text-[11px] font-mono text-muted-foreground/60 leading-relaxed">
            © {new Date().getFullYear()} РУСАЛЕН. Все права защищены. Данный сайт не оказывает экстренную психологическую помощь.
            Информация, размещённая на сайте, носит информационный характер и не заменяет консультацию квалифицированного специалиста.
          </p>
          <p className="text-[11px] font-mono text-muted-foreground/60 leading-relaxed">
            АНО «Международный исследовательский центр РУСАЛЕН» · ИНН 7736341108 · ОГРН 1227700255408 ·
            Лицензия на образовательную деятельность № Л035-01298-77/01005950 от 22.12.2023
          </p>
          <p className="text-[11px] font-mono text-muted-foreground/60 leading-relaxed">
            Финансовые сервисы PsyPay доступны после прохождения верификации и могут зависеть от юрисдикции, комплаенс-проверки
            и требований партнёрских финансовых организаций.
          </p>
        </div>
      </div>
    </footer>
  );
}