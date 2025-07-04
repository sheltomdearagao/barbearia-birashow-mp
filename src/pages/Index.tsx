
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProductsSection from '@/components/ProductsSection';
import ContactSection from '@/components/ContactSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';

const Index = () => {
  return (
    <div className="min-h-screen bg-barbershop-dark">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProductsSection />
        <ContactSection />
        <ReviewsSection />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default Index;
