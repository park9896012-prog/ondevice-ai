import React, { useEffect, useState } from 'react';
import { Language, SystemHardwareInfo } from './types';
import { TRANSLATIONS } from './data/translations';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DefinitionSection } from './components/DefinitionSection';
import { ModelExplorerSection } from './components/ModelExplorerSection';
import { RecommenderSection } from './components/RecommenderSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { IntegrationGuideSection } from './components/IntegrationGuideSection';
import { TechInfoSection } from './components/TechInfoSection';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('kr');
  const [hardware, setHardware] = useState<SystemHardwareInfo | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title = TRANSLATIONS[language].meta.pageTitle;
  }, [language]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        hardware={hardware}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          language={language}
          onNavigateToRecommender={() => scrollToSection('recommender')}
          onNavigateToModels={() => scrollToSection('models')}
        />

        {/* 1 & 2. Definition & Core Architecture */}
        <DefinitionSection language={language} />

        {/* 1 & 2. Model Explorer Catalog with Pros/Cons & Visuals */}
        <ModelExplorerSection language={language} />

        {/* 4. System Hardware AI Model Recommender Program */}
        <RecommenderSection
          language={language}
          hardware={hardware}
          setHardware={setHardware}
        />

        {/* 3. Industry Application Domains & Usage Steps */}
        <ApplicationsSection language={language} />

        {/* 5. Developer Application Integration Playbook & Code Generator */}
        <IntegrationGuideSection language={language} />

        {/* 6. Technical Insights (Quantization, NPU TOPS Benchmarks, Cost Calc, WebGPU Test) */}
        <TechInfoSection language={language} />
      </main>

      {/* AI Advisor Modal Drawer */}
      <AiAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        language={language}
        hardware={hardware}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigateToSection={scrollToSection}
      />
    </div>
  );
}
