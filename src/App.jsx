import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { lessons } from './data/lessons';
import { ui as uiDict } from './data/translations';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import { CareerPage, GlossaryPage, LabsPage, ResourcesPage, RoadmapsPage } from './pages/InfoPages';

export default function App() {
  const [lang, setLang] = useState('en');
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const filteredLessons = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return lessons;
    return lessons.filter((l) =>
      [l.title, l.section, l.definitionFr, l.conceptHt, l.deepExplanation]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

  const ui = uiDict[lang];

  return (
    <AuthProvider>
      <Layout
        lang={lang}
        setLang={setLang}
        dark={dark}
        setDark={setDark}
        search={search}
        setSearch={setSearch}
        ui={ui}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        <Routes>
          <Route path="/" element={<HomePage filteredLessons={filteredLessons} ui={ui} activeSection={activeSection} setActiveSection={setActiveSection} />} />
          <Route path="/courses" element={<CoursesPage filteredLessons={filteredLessons} ui={ui} activeSection={activeSection} setActiveSection={setActiveSection} />} />
          <Route path="/lesson/:id" element={<LessonPage lessons={lessons} ui={ui} />} />
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/login" element={<LoginPage ui={ui} />} />
          <Route path="/signup" element={<SignupPage ui={ui} />} />
          <Route path="/dashboard" element={<DashboardPage ui={ui} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

