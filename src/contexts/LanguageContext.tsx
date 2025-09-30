import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hardcoded translations
const translations = {
  en: {
    // App
    'app.name': 'Fish Net',
    'app.tagline': 'Identify, Track, and Share Your Catches',
    
    // Navigation
    'nav.home': 'Home',
    'nav.analyze': 'Analyze',
    'nav.map': 'Map',
    'nav.history': 'My Catches',
    'nav.profile': 'Profile',
    
    // Auth
    'auth.welcomeBack': 'Welcome Back',
    'auth.signInMessage': 'Sign in to continue your fishing journey',
    'auth.signUpMessage': 'Join the fishing community today',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.emailPlaceholder': 'your@email.com',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.namePlaceholder': 'Your name',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.signUpHere': 'Sign up here',
    'auth.signInHere': 'Sign in here',
    'auth.loading': 'Loading...',
    
    // Feed
    'feed.title': 'Feed',
    'feed.search': 'Search posts...',
    'feed.messages': 'Messages',
    'feed.community': 'Community',
    'feed.directChats': 'Direct Chats',
    'feed.noPosts': 'No posts yet',
    
    // Analyze
    'analyze.title': 'Analyze',
    'analyze.uploadImage': 'Upload Image',
    'analyze.takePhoto': 'Take Photo',
    'analyze.analyzeFish': 'Analyze Fish',
    'analyze.analyzing': 'Analyzing...',
    'analyze.selectImage': 'Select an image to identify the fish species',
    'analyze.results': 'Analysis Results',
    'analyze.species': 'Species',
    'analyze.confidence': 'Confidence',
    'analyze.uploadFromDevice': 'Upload from device',
    
    // Map
    'map.title': 'Map',
    'map.myCatches': 'My Catches',
    'map.viewOnMap': 'View on Map',
    'map.location': 'Location',
    
    // History
    'history.title': 'My Catches',
    'history.search': 'Search catches...',
    'history.noCatches': 'No catches yet',
    'history.caught': 'Caught',
    'history.location': 'Location',
    'history.weight': 'Weight',
    'history.date': 'Date',
    'history.viewDetails': 'View Details',
    
    // Profile
    'profile.title': 'Profile',
    'profile.settings': 'Settings',
    'profile.edit': 'Edit Profile',
    'profile.signOut': 'Sign Out',
    'profile.totalCatches': 'Total Catches',
    'profile.favoriteSpecies': 'Favorite Species',
    'profile.memberSince': 'Member Since',
    'profile.bio': 'Bio',
    'profile.catches': 'Catches',
    'profile.followers': 'Followers',
    'profile.following': 'Following',
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile Settings',
    'settings.name': 'Name',
    'settings.email': 'Email',
    'settings.location': 'Location',
    'settings.locationPermission': 'Allow Location Access',
    'settings.locationEnabled': 'Location access enabled',
    'settings.locationDisabled': 'Location access disabled',
    'settings.language': 'Language',
    'settings.selectLanguage': 'Select Language',
    'settings.save': 'Save Changes',
    'settings.cancel': 'Cancel',
    'settings.saved': 'Settings saved successfully',
    'settings.confirmLanguage': 'Confirm Language Change',
    'settings.confirmLanguageMessage': 'Are you sure you want to change the language to Tamil?',
    'settings.confirm': 'Confirm',
    'settings.currentLocation': 'Current Location',
    'settings.requestPermission': 'Request Permission',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    
    // Chat
    'chat.typeMessage': 'Type a message...',
    'chat.send': 'Send',
    'chat.online': 'Online',
    'chat.offline': 'Offline',
    'chat.noMessages': 'No messages yet',
  },
  ta: {
    // App
    'app.name': 'ஃபிஷ் நெட்',
    'app.tagline': 'உங்கள் மீன்களை அடையாளம் காணுங்கள், கண்காணியுங்கள், பகிருங்கள்',
    
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.analyze': 'பகுப்பாய்வு',
    'nav.map': 'வரைபடம்',
    'nav.history': 'எனது பிடிகள்',
    'nav.profile': 'சுயவிவரம்',
    
    // Auth
    'auth.welcomeBack': 'மீண்டும் வரவேற்கிறோம்',
    'auth.signInMessage': 'உங்கள் மீன்பிடி பயணத்தை தொடர உள்நுழையவும்',
    'auth.signUpMessage': 'இன்று மீன்பிடி சமூகத்தில் சேரவும்',
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.name': 'பெயர்',
    'auth.emailPlaceholder': 'உங்கள்@மின்னஞ்சல்.com',
    'auth.passwordPlaceholder': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    'auth.namePlaceholder': 'உங்கள் பெயர்',
    'auth.signIn': 'உள்நுழைக',
    'auth.signUp': 'பதிவு செய்க',
    'auth.noAccount': 'கணக்கு இல்லையா?',
    'auth.haveAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
    'auth.signUpHere': 'இங்கே பதிவு செய்யவும்',
    'auth.signInHere': 'இங்கே உள்நுழையவும்',
    'auth.loading': 'ஏற்றுகிறது...',
    
    // Feed
    'feed.title': 'ஊட்டம்',
    'feed.search': 'இடுகைகளை தேடு...',
    'feed.messages': 'செய்திகள்',
    'feed.community': 'சமூகம்',
    'feed.directChats': 'நேரடி அரட்டைகள்',
    'feed.noPosts': 'இடுகைகள் இல்லை',
    
    // Analyze
    'analyze.title': 'பகுப்பாய்வு',
    'analyze.uploadImage': 'படத்தை பதிவேற்று',
    'analyze.takePhoto': 'புகைப்படம் எடு',
    'analyze.analyzeFish': 'மீனை பகுப்பாய்வு செய்',
    'analyze.analyzing': 'பகுப்பாய்வு செய்கிறது...',
    'analyze.selectImage': 'மீன் இனத்தை அடையாளம் காண படத்தைத் தேர்ந்தெடுக்கவும்',
    'analyze.results': 'பகுப்பாய்வு முடிவுகள்',
    'analyze.species': 'இனம்',
    'analyze.confidence': 'நம்பிக்கை',
    'analyze.uploadFromDevice': 'சாதனத்திலிருந்து பதிவேற்று',
    
    // Map
    'map.title': 'வரைபடம்',
    'map.myCatches': 'எனது பிடிகள்',
    'map.viewOnMap': 'வரைபடத்தில் பார்க்க',
    'map.location': 'இடம்',
    
    // History
    'history.title': 'எனது பிடிகள்',
    'history.search': 'பிடிகளை தேடு...',
    'history.noCatches': 'பிடிகள் இல்லை',
    'history.caught': 'பிடித்தது',
    'history.location': 'இடம்',
    'history.weight': 'எடை',
    'history.date': 'தேதி',
    'history.viewDetails': 'விவரங்களைப் பார்க்க',
    
    // Profile
    'profile.title': 'சுயவிவரம்',
    'profile.settings': 'அமைப்புகள்',
    'profile.edit': 'சுயவிவரத்தைத் திருத்து',
    'profile.signOut': 'வெளியேறு',
    'profile.totalCatches': 'மொத்த பிடிகள்',
    'profile.favoriteSpecies': 'விருப்பமான இனம்',
    'profile.memberSince': 'உறுப்பினர் தொடங்கி',
    'profile.bio': 'சுயவிவரம்',
    'profile.catches': 'பிடிகள்',
    'profile.followers': 'பின்தொடர்பவர்கள்',
    'profile.following': 'பின்தொடர்கிறது',
    
    // Settings
    'settings.title': 'அமைப்புகள்',
    'settings.profile': 'சுயவிவர அமைப்புகள்',
    'settings.name': 'பெயர்',
    'settings.email': 'மின்னஞ்சல்',
    'settings.location': 'இடம்',
    'settings.locationPermission': 'இட அணுகலை அனுமதி',
    'settings.locationEnabled': 'இட அணுகல் இயக்கப்பட்டது',
    'settings.locationDisabled': 'இட அணுகல் முடக்கப்பட்டது',
    'settings.language': 'மொழி',
    'settings.selectLanguage': 'மொழியைத் தேர்ந்தெடு',
    'settings.save': 'மாற்றங்களை சேமி',
    'settings.cancel': 'ரத்து செய்',
    'settings.saved': 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன',
    'settings.confirmLanguage': 'மொழி மாற்றத்தை உறுதிப்படுத்து',
    'settings.confirmLanguageMessage': 'நீங்கள் மொழியை தமிழ் க்கு மாற்ற விரும்புகிறீர்களா?',
    'settings.confirm': 'உறுதிப்படுத்து',
    'settings.currentLocation': 'தற்போதைய இடம்',
    'settings.requestPermission': 'அனுமதி கோரு',
    
    // Common
    'common.save': 'சேமி',
    'common.cancel': 'ரத்து செய்',
    'common.delete': 'நீக்கு',
    'common.edit': 'திருத்து',
    'common.close': 'மூடு',
    'common.search': 'தேடு',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.yes': 'ஆம்',
    'common.no': 'இல்லை',
    'common.ok': 'சரி',
    
    // Chat
    'chat.typeMessage': 'செய்தியை தட்டச்சு செய்யவும்...',
    'chat.send': 'அனுப்பு',
    'chat.online': 'ஆன்லைன்',
    'chat.offline': 'ஆஃப்லைன்',
    'chat.noMessages': 'செய்திகள் இல்லை',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('fishnet_language');
    return (stored === 'ta' ? 'ta' : 'en') as Language;
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem('fishnet_language', lang);
    setLanguageState(lang);
    
    // Force reload when switching to Tamil to ensure clean state
    if (lang === 'ta') {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};