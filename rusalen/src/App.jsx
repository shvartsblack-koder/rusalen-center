import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import { LeadModalProvider } from '@/components/LeadModal';
import CookieConsent from '@/components/CookieConsent';

import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/about/Team';
import Mission from './pages/about/Mission';
import News from './pages/about/News';
import Vacancies from './pages/about/Vacancies';
import Documents from './pages/about/Documents';
import Science from './pages/Science';
import Directions from './pages/science/Directions';
import Labs from './pages/science/Labs';
import Publications from './pages/science/Publications';
import Conferences from './pages/science/Conferences';
import International from './pages/science/International';
import Education from './pages/Education';
import EducationPrograms from './pages/EducationPrograms';
import EducationVisualization from './pages/EducationVisualization';
import PsychiatryProgram from './pages/education/PsychiatryProgram';
import EducationTeam from './pages/education/Team';
import EducationCategory from './pages/EducationCategory';
import PsyMedia from './pages/PsyMedia';
import PsyTorg from './pages/PsyTorg';
import PsyPay from './pages/PsyPay';
import PsyTech from './pages/PsyTech';
import Accelerator from './pages/psytech/Accelerator';
import Crowdfunding from './pages/psytech/Crowdfunding';
import Fund from './pages/psytech/Fund';
import Psyvent from './pages/Psyvent';
import Psyty from './pages/Psyty';
import Forum from './pages/Forum';
import ForumTopic from './pages/ForumTopic';
import Contacts from './pages/Contacts';
import MediaLibrary from './pages/MediaLibrary';
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router basename={routerBasename}>
          <LeadModalProvider>
            <CookieConsent />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/team" element={<Team />} />
                <Route path="/about/mission" element={<Mission />} />
                <Route path="/about/news" element={<News />} />
                <Route path="/about/vacancies" element={<Vacancies />} />
                <Route path="/about/documents" element={<Documents />} />
                <Route path="/science" element={<Science />} />
                <Route path="/science/directions" element={<Directions />} />
                <Route path="/science/labs" element={<Labs />} />
                <Route path="/science/publications" element={<Publications />} />
                <Route path="/science/conferences" element={<Conferences />} />
                <Route path="/science/international" element={<International />} />
                <Route path="/science/programs" element={<Science />} />
                <Route path="/science/partnerships" element={<Science />} />
                <Route path="/education" element={<Education />} />
                <Route path="/education/programs" element={<EducationPrograms />} />
                <Route path="/education/programs/psychiatry-for-psychologists" element={<PsychiatryProgram />} />
                <Route path="/education/team" element={<EducationTeam />} />
                <Route path="/education/visualization" element={<EducationVisualization />} />
                <Route path="/education/:category" element={<EducationCategory />} />
                <Route path="/psychiatry-for-psychologists" element={<Navigate to="/education/programs/psychiatry-for-psychologists" replace />} />
                <Route path="/psypedia" element={<Navigate to="/library" replace />} />
                <Route path="/psymedia" element={<PsyMedia />} />
                <Route path="/psytorg" element={<PsyTorg />} />
                <Route path="/psypay" element={<PsyPay />} />
                <Route path="/psytech" element={<PsyTech />} />
                <Route path="/psytech/accelerator" element={<Accelerator />} />
                <Route path="/psytech/crowdfunding" element={<Crowdfunding />} />
                <Route path="/psytech/fund" element={<Fund />} />
                <Route path="/psyvent" element={<Psyvent />} />
                <Route path="/psyty" element={<Psyty />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/topic/:id" element={<ForumTopic />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/library" element={<MediaLibrary />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </LeadModalProvider>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
