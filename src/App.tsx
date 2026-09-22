import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import { HeaderProvider } from './context/HeaderContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AccessibilityProvider>
            <HeaderProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<MapPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/statistics/:kecamatan?" element={<StatisticsPage />} />
                </Routes>
              </Layout>
            </HeaderProvider>
          </AccessibilityProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
