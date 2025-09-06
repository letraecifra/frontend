import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Music, 
  TrendingUp, 
  Clock, 
  Bookmark, 
  Sun, 
  Moon, 
  Globe, 
  User, 
  LogIn,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock state

  // Initialize theme and language from localStorage and browser on component mount
  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      // Default to light mode
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Language initialization
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language || navigator.languages[0];
      const detectedLanguage = browserLanguage.toLowerCase().startsWith('pt') ? 'pt' : 'en';
      setLanguage(detectedLanguage);
      localStorage.setItem('language', detectedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en";
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const navigationItems = [
    { href: "/", label: language === "en" ? "Home" : "Início", icon: Music },
    { href: "/latest", label: language === "en" ? "Latest" : "Recentes", icon: Clock },
    { href: "/popular", label: language === "en" ? "Popular" : "Populares", icon: TrendingUp },
    { href: "/bookmarks", label: language === "en" ? "Bookmarks" : "Favoritos", icon: Bookmark },
  ];

  return (
    <nav className="border-b bg-gradient-card shadow-card sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-musical">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform ease-musical">
              Letra & Cifra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors ease-musical"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-accent transition-colors ease-musical"
            >
              <Search className="w-4 h-4" />
            </Button>
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover:bg-accent transition-colors ease-musical"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-accent transition-colors ease-musical">
                  <Globe className="w-4 h-4" />
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {language.toUpperCase()}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  setLanguage("en");
                  localStorage.setItem('language', 'en');
                }}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setLanguage("pt");
                  localStorage.setItem('language', 'pt');
                }}>
                  Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-accent transition-colors ease-musical">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile">{language === "en" ? "Profile" : "Perfil"}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-songs">{language === "en" ? "My Songs" : "Minhas Músicas"}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    {language === "en" ? "Logout" : "Sair"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-gradient-primary hover:bg-primary-hover shadow-musical transition-all ease-musical"
                onClick={() => setIsLoggedIn(true)}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {language === "en" ? "Login" : "Entrar"}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-accent transition-colors ease-musical"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-card/95 backdrop-blur-sm">
            <div className="py-4 space-y-4">
              {/* Mobile Navigation */}
              <div className="px-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors ease-musical"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Search" : "Buscar"}
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder={language === "en" ? "Search songs, artists..." : "Buscar músicas, artistas..."}
              className="pl-10"
              autoFocus
            />
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};