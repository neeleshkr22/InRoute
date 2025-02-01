// import { franc } from 'franc-min';  // Example: Using `franc-min` for language detection

// export const detectLanguage = (text) => {
//   const languageCode = franc(text); 
//   return languageCode !== 'und' ? languageCode : null;
// };

import franc from 'franc';

export const detectLanguage = (text) => {
  try {
    const detectedLang = franc(text);
    // Convert franc's ISO 639-3 codes to BCP 47 language tags
    const languageMapping = {
      'eng': 'en-US',
      'spa': 'es-ES',
      'fra': 'fr-FR',
      'deu': 'de-DE',
      'ita': 'it-IT',
      'jpn': 'ja-JP',
      'kor': 'ko-KR',
      'cmn': 'zh-CN',
      'hin': 'hi-IN',
      // Add more mappings as needed
    };
    
    return languageMapping[detectedLang] || 'en-US';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en-US';
  }
};
