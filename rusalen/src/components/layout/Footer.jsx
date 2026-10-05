import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';
import { isValidEmail, VALIDATION_MESSAGES } from '@/lib/formValidation';
import { submitLead } from '@/lib/submitLead';

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
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!consent) return;
    if (!isValidEmail(email)) {
      setEmailError(VALIDATION_MESSAGES.email);
      return;
    }

    setEmailError('');
    setSubmitError('');
    setLoading(true);
    try {
      await submitLead({
        name: 'Подписка на новости',
        email,
        phone: '',
        source: `${window.location.pathname} | подписка на рассылку`,
        consent: true,
      });
      setSubscribed(true);
      setEmail('');
      setConsent(false);
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setSubmitError('Не удалось подписаться. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-border bg-[hsl(220,18%,5%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
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

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-lg font-semibold mb-1">Подпишитесь на новости</h4>
              <p className="text-sm text-muted-foreground">Получайте актуальные новости, анонсы и исследования РУСАЛЕН</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full md:w-auto">
              {subscribed ? (
                <p className="text-sm text-accent">Вы успешно подписались!</p>
              ) : (
                <>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    className="bg-secondary border-border w-full md:w-64"
                  />
                  <Button
                    type="submit"
                    disabled={loading || !consent}
                    className="bg-primary text-primary-foreground hover:bg-primary/80 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <label className="flex items-start gap-2 text-xs leading-snug cursor-pointer text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 shrink-0"
                  />
                  <span>
                    Я даю согласие на обработку персональных данных в соответствии с{' '}
                    <Link to="/privacy" className="text-primary underline" onClick={(e) => e.stopPropagation()}>
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>
                {!consent && (
                  <p className="text-destructive text-xs">
                    Необходимо согласие на обработку персональных данных
                  </p>
                )}
                </>
              )}
              {emailError && <p className="text-destructive text-xs">{emailError}</p>}
              {submitError && <p className="text-destructive text-xs">{submitError}</p>}
            </form>
          </div>
        </div>

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
            <Link to="/privacy" className="underline hover:text-foreground">Политика конфиденциальности</Link>
            {' · '}
            Финансовые сервисы PsyPay доступны после прохождения верификации и могут зависеть от юрисдикции, комплаенс-проверки
            и требований партнёрских финансовых организаций.
          </p>
        </div>
      </div>
    </footer>
  );
}
