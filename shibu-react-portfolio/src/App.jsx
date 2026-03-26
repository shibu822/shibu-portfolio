import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CustomCursor from './components/CustomCursor';
import ParticleNetwork from './components/ParticleNetwork';

import useScrollReveal from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <>
      <ParticleNetwork />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        


        <Services />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
