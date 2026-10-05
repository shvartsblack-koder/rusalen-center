import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactBlock from '../shared/ContactBlock';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ContactBlock />
      <Footer />
    </div>
  );
}