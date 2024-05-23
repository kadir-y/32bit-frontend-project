import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import OfflineDiaolog from './components/OfflineDiaolog';

import useTitle from './hooks/useTitle';

import './stylesheets/App.css';

function App() {
  const { t } = useTranslation('app');
  useTitle(t('documentTitle'))
  return (
    <div className="App">
      <Outlet />
      <OfflineDiaolog />
    </div>
  );
}

export default App;
