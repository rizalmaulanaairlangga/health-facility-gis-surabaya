import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import { HeaderProvider } from './context/HeaderContext';

function App() {
  return (
    <Router>
      <HeaderProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/statistics/:kecamatan?" element={<StatisticsPage />} />
          </Routes>
        </Layout>
      </HeaderProvider>
    </Router>
  );
}

export default App;
