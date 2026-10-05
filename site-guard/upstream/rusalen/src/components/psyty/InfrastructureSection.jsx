import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

const places = [
  {
    title: 'PSYTY Lab',
    tagline: 'Исследования рядом с домом',
    img: 'https://media.base44.com/images/public/6a8e40cf6b6b2dae667b4c8e/fcbb0d10b_generated_6b7682f9.png',
  },
  {
    title: 'PSYTY Farm',
    tagline: 'С фермы — на ваш стол',
    img: 'https://media.base44.com/images/public/6a8e40cf6b6b2dae667b4c8e/d7bfdd8c4_generated_81ca4940.png',
  },
  {
    title: 'PSYTY Library',
    tagline: 'Библиотека человеческой природы',
    img: 'https://media.base44.com/images/public/6a8e40cf6b6b2dae667b4c8e/c5d550182_generated_7e20aa54.png',
  },
];

export default function InfrastructureSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Среда и инфраструктура"
          title="Не недвижимость — образ жизни"
          description="Лаборатория, академия, практика, ферма, библиотека, лесные маршруты и дом тишины — всё в шаговой доступности. Это и есть среда PSYTY."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden group hover:border-primary/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">{p.title}</p>
                <h4 className="font-semibold">{p.tagline}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}