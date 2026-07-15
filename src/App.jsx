import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <HelmetProvider>
      <Layout>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Footer />
      </Layout>
    </HelmetProvider>
  );
}

export default App;
