import en from './en';
import espanol from './espanol';
import indonesia from './indonesia';
import nga from './nga';
import cn from './cn';
import bodaonha from './bodaonha';
import italia from './italia';
import phap from './phap';
import vn from './vn';

let languagePack = {};

export const getLanguagePack = async () => {
  let locations = JSON.parse(localStorage.getItem('locations')) || {
    language: 'EN',
  };

  if (locations.language === 'EN') {
    languagePack = en;
  }else if (locations.language === 'TAYBANNHA') {
    languagePack = espanol;
  } else if (locations.language === 'INDO') {
    languagePack = indonesia;
  }else if (locations.language === 'NGA') {
    languagePack = nga;
  }else if (locations.language === 'CHINA') {
    languagePack = cn;
  }else if (locations.language === 'BODAONHA') {
    languagePack = bodaonha;
  }else if (locations.language === 'ITALI') {
    languagePack = italia;
  }else if (locations.language === 'PHAP') {
    languagePack = phap;
  }else if (locations.language === 'VN') {
    languagePack = vn;
  }
  return languagePack;
};

export const setLanguage = (language) => {
  const locations = JSON.parse(localStorage.getItem('locations')) || {
    language: 'EN',
  };

  locations.language = language;
  localStorage.setItem('locations', JSON.stringify(locations));

  window.location.reload();
};

export { languagePack };

getLanguagePack();
