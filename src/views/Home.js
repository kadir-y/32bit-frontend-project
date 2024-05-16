import { useState } from 'react';
import i18n from '../i18n';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Home () {
  const [displayLanguage, setDisplayLanguage] = useState(i18n.language);
  const { t } = useTranslation('login');
  function handleClick () {
    const newDisplayLanguage = displayLanguage === 'en-US' ? 'tr-TR' : 'en-US';
    i18n.changeLanguage(newDisplayLanguage);
    setDisplayLanguage(newDisplayLanguage);
  }

  return (
    <div className="home">
      <h3>{ t('welcome') }</h3>
      <p>{ t('hello', { name: 'Kadir' }) }</p>
      <Button onClick={handleClick} variant="contained">{ t('changeTheAppLanguage') }</Button>
    </div>
  );
}

export default Home;