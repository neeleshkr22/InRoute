import { franc } from 'franc-min';  // Example: Using `franc-min` for language detection

export const detectLanguage = (text) => {
  const languageCode = franc(text); // Detect the language
  return languageCode !== 'und' ? languageCode : null; // Return null if language could not be detected
};
