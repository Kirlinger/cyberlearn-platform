import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { lessons } from './data/lessons';
import { ui as uiDict } from './data/translations';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import { CareerPage, GlossaryPage, LabsPage, ResourcesPage, RoadmapsPage } from './pages/InfoPages';

export default function App() {
  const [lang, setLang] = useState('fr');
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState('');
  document.documentElement.classList.toggle('dark', dark);

  const filteredLessons = useMemo(() => {
    const q = search.toLowerCase();
    return lessons.filter((l) => [l.title, l.section, l.definitionFr, l.conceptHt, l.deepExplanation].join(' ').toLowerCase().includes(q));
  }, [search]);

  const ui = uiDict[lang];

  return (
    <Layout lang={lang} setLang={setLang} dark={dark} setDark={setDark} search={search} setSearch={setSearch} ui={ui}>
      <Routes>
        <Route path="/" element={<HomePage lessons={filteredLessons} ui={ui} />} />
        <Route path="/lesson/:id" element={<LessonPage lessons={lessons} ui={ui} />} />
        <Route path="/roadmaps" element={<RoadmapsPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
