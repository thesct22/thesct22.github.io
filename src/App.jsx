import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import SEO from './components/SEO/SEO';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <SEO />
        <Navbar />
        <main className="main">
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Education />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
