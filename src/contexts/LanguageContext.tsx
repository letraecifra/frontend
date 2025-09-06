import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  language: "en" | "pt";
  setLanguage: (language: "en" | "pt") => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.latest": "Latest", 
    "nav.popular": "Popular",
    "nav.bookmarks": "Bookmarks",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.profile": "Profile",
    "nav.mySongs": "My Songs",
    "nav.search": "Search",
    "nav.searchPlaceholder": "Search songs, artists...",
    
    // Home page
    "home.heroTitle1": "Share Your",
    "home.heroTitle2": "Musical Story",
    "home.heroSubtitle": "The ultimate platform for sharing lyrics, chords, tablatures, and sheet music with musicians worldwide.",
    "home.searchPlaceholder": "Search for songs, artists, or chords...",
    "home.songsCount": "Songs",
    "home.artistsCount": "Artists", 
    "home.musiciansCount": "Musicians",
    "home.thisWeekCount": "This Week",
    "home.discoverMusic": "Discover Music",
    "home.discoverSubtitle": "Explore the latest additions and community favorites",
    "home.filter": "Filter",
    "home.latest": "Latest",
    "home.popular": "Popular", 
    "home.trending": "Trending",
    "home.loadMore": "Load More Songs",
    
    // Auth pages
    "auth.welcomeBack": "Welcome Back",
    "auth.signInSubtitle": "Sign in to access your musical library",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.createAccount": "Create Account",
    "auth.joinCommunity": "Join Our Community",
    "auth.createAccountSubtitle": "Create your account and start sharing music",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.rememberMe": "Remember me",
    "auth.forgotPassword": "Forgot password?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.continueWithGoogle": "Continue with Google",
    "auth.continueWithTwitter": "Continue with X/Twitter",
    "auth.orContinueWithEmail": "Or continue with email",
    "auth.orCreateWithEmail": "Or create with email",
    "auth.agreeToTerms": "I agree to the Terms of Service and Privacy Policy",
    "auth.termsOfService": "Terms of Service",
    "auth.privacyPolicy": "Privacy Policy",
    "auth.signingIn": "Signing in...",
    "auth.creatingAccount": "Creating account...",
    "auth.enterEmail": "Enter your email",
    "auth.enterPassword": "Enter your password",
    "auth.enterFullName": "Enter your full name",
    "auth.confirmPasswordPlaceholder": "Confirm your password",
    "auth.createPasswordHint": "Create a password (min. 6 characters)",
    "auth.footerText": "By signing in, you agree to our Terms of Service and Privacy Policy",
    
    // NotFound page
    "notFound.title": "404",
    "notFound.message": "Oops! Page not found",
    "notFound.description": "The page you're looking for doesn't exist or has been moved.",
    "notFound.returnHome": "Return to Home",
    
    // Song detail
    "song.backToHome": "Back to Home",
    "song.chords": "Chords",
    "song.lyrics": "Lyrics", 
    "song.tablature": "Tablature",
    "song.sheetMusic": "Sheet Music",
    "song.chordsAndLyrics": "Chords & Lyrics",
    "song.download": "Download",
    "song.comments": "Comments",
    "song.addComment": "Add Comment",
    "song.commentPlaceholder": "Share your thoughts about this song...",
    "song.reply": "Reply",
    "song.playOnSpotify": "Play on Spotify",
    "song.watchOnYoutube": "Watch on YouTube",
    "song.songInformation": "Song Information",
    "song.addedBy": "Added by:",
    "song.addedOn": "Added on:",
    "song.type": "Type:",
    "song.originalKey": "Original Key:",
    "song.language": "Language:",
    "song.chordChart": "Chord Chart",
    "song.moreByArtist": "More by this Artist",
    
    // Chord transposer
    "transpose.title": "Key Transposer",
    "transpose.currentKey": "Current Key:",
    "transpose.semitones": " semitones",
    "transpose.reset": "Reset",
    "transpose.quickTranspose": "Quick Transpose",
    "transpose.selectTargetKey": "Select Target Key:",
    "transpose.original": "Original",
    "transpose.originalKey": "Original key: ",
    "transpose.autoTranspose": "All chords in the song will automatically transpose to match the selected key.",
    
    // Artists page
    "artists.title": "Artists",
    "artists.subtitle": "Discover talented musicians from around the world",
    "artists.searchPlaceholder": "Search artists or genres...",
    "artists.sortBy": "Sort by:",
    "artists.name": "Name",
    "artists.songs": "Songs",
    "artists.popularity": "Popularity",
    "artists.found": "artists found",
    "artists.filters": "Filters",
    "artists.loadMore": "Load More Artists",
    "artists.likes": "likes",
    
    // Common
    "common.english": "English",
    "common.portuguese": "Português",
    "common.view": "View",
    "common.loading": "Loading...",
    "common.error": "Error"
  },
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.latest": "Recentes",
    "nav.popular": "Populares", 
    "nav.bookmarks": "Favoritos",
    "nav.login": "Entrar",
    "nav.logout": "Sair",
    "nav.profile": "Perfil",
    "nav.mySongs": "Minhas Músicas",
    "nav.search": "Buscar",
    "nav.searchPlaceholder": "Buscar músicas, artistas...",
    
    // Home page
    "home.heroTitle1": "Compartilhe Sua",
    "home.heroTitle2": "História Musical",
    "home.heroSubtitle": "A plataforma definitiva para compartilhar letras, cifras, tablaturas e partituras com músicos do mundo todo.",
    "home.searchPlaceholder": "Buscar músicas, artistas ou acordes...",
    "home.songsCount": "Músicas",
    "home.artistsCount": "Artistas",
    "home.musiciansCount": "Músicos", 
    "home.thisWeekCount": "Esta Semana",
    "home.discoverMusic": "Descobrir Música",
    "home.discoverSubtitle": "Explore as últimas adições e favoritos da comunidade",
    "home.filter": "Filtrar",
    "home.latest": "Recentes",
    "home.popular": "Popular",
    "home.trending": "Tendência", 
    "home.loadMore": "Carregar Mais Músicas",
    
    // Auth pages
    "auth.welcomeBack": "Bem-vindo de Volta",
    "auth.signInSubtitle": "Entre para acessar sua biblioteca musical",
    "auth.signIn": "Entrar",
    "auth.signUp": "Cadastrar",
    "auth.createAccount": "Criar Conta",
    "auth.joinCommunity": "Junte-se à Nossa Comunidade",
    "auth.createAccountSubtitle": "Crie sua conta e comece a compartilhar música",
    "auth.email": "E-mail",
    "auth.password": "Senha",
    "auth.confirmPassword": "Confirmar Senha",
    "auth.fullName": "Nome Completo",
    "auth.rememberMe": "Lembrar-me",
    "auth.forgotPassword": "Esqueceu a senha?",
    "auth.dontHaveAccount": "Não tem uma conta?",
    "auth.alreadyHaveAccount": "Já tem uma conta?",
    "auth.continueWithGoogle": "Continuar com Google",
    "auth.continueWithTwitter": "Continuar com X/Twitter",
    "auth.orContinueWithEmail": "Ou continue com email",
    "auth.orCreateWithEmail": "Ou criar com email",
    "auth.agreeToTerms": "Concordo com os Termos de Serviço e Política de Privacidade",
    "auth.termsOfService": "Termos de Serviço",
    "auth.privacyPolicy": "Política de Privacidade",
    "auth.signingIn": "Entrando...",
    "auth.creatingAccount": "Criando conta...",
    "auth.enterEmail": "Digite seu e-mail",
    "auth.enterPassword": "Digite sua senha",
    "auth.enterFullName": "Digite seu nome completo",
    "auth.confirmPasswordPlaceholder": "Confirme sua senha",
    "auth.createPasswordHint": "Crie uma senha (mín. 6 caracteres)",
    "auth.footerText": "Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade",
    
    // NotFound page
    "notFound.title": "404",
    "notFound.message": "Ops! Página não encontrada",
    "notFound.description": "A página que você está procurando não existe ou foi movida.",
    "notFound.returnHome": "Voltar ao Início",
    
    // Song detail
    "song.backToHome": "Voltar ao Início",
    "song.chords": "Cifra",
    "song.lyrics": "Letra",
    "song.tablature": "Tablatura", 
    "song.sheetMusic": "Partitura",
    "song.chordsAndLyrics": "Cifra & Letra",
    "song.download": "Baixar",
    "song.comments": "Comentários",
    "song.addComment": "Adicionar Comentário",
    "song.commentPlaceholder": "Compartilhe sua opinião sobre esta música...",
    "song.reply": "Responder",
    "song.playOnSpotify": "Tocar no Spotify",
    "song.watchOnYoutube": "Ver no YouTube",
    "song.songInformation": "Informações da Música",
    "song.addedBy": "Adicionado por:",
    "song.addedOn": "Adicionado em:",
    "song.type": "Tipo:",
    "song.originalKey": "Tom Original:",
    "song.language": "Idioma:",
    "song.chordChart": "Cifra",
    "song.moreByArtist": "Mais deste Artista",
    
    // Chord transposer
    "transpose.title": "Transpositor de Tom",
    "transpose.currentKey": "Tom Atual:",
    "transpose.semitones": " semitons",
    "transpose.reset": "Resetar",
    "transpose.quickTranspose": "Transposição Rápida",
    "transpose.selectTargetKey": "Selecionar Tom Alvo:",
    "transpose.original": "Original",
    "transpose.originalKey": "Tom original: ",
    "transpose.autoTranspose": "Todos os acordes da música serão automaticamente transpostos para o tom selecionado.",
    
    // Artists page
    "artists.title": "Artistas",
    "artists.subtitle": "Descubra músicos talentosos de todo o mundo",
    "artists.searchPlaceholder": "Buscar artistas ou gêneros...",
    "artists.sortBy": "Ordenar por:",
    "artists.name": "Nome",
    "artists.songs": "Músicas",
    "artists.popularity": "Popularidade",
    "artists.found": "artistas encontrados",
    "artists.filters": "Filtros",
    "artists.loadMore": "Carregar Mais Artistas",
    "artists.likes": "curtidas",
    
    // Common
    "common.english": "English",
    "common.portuguese": "Português",
    "common.view": "Ver",
    "common.loading": "Carregando...",
    "common.error": "Erro"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<"en" | "pt">("en");

  useEffect(() => {
    // Language initialization - same logic as Navigation component
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language || navigator.languages[0];
      const detectedLanguage = browserLanguage.toLowerCase().startsWith('pt') ? 'pt' : 'en';
      setLanguageState(detectedLanguage);
      localStorage.setItem('language', detectedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: "en" | "pt") => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};