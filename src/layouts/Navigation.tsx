import {
  Bookmark,
  Clock,
  Globe,
  LogIn,
  Menu,
  Moon,
  Music,
  Search,
  Sun,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { useLanguage } from '~/contexts';

export function Navigation(): ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock state
  const { language, setLanguage, t } = useLanguage();

  const navigationItems = [
    { href: '/', label: t('nav.home'), icon: Music },
    { href: '/latest', label: t('nav.latest'), icon: Clock },
    { href: '/popular', label: t('nav.popular'), icon: TrendingUp },
    { href: '/bookmarks', label: t('nav.bookmarks'), icon: Bookmark },
  ];

  function handleToggleTheme(): void {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

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
  }, []);

  return (
    <nav className="border-b bg-gradient-card shadow-card sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-musical">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>

            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform ease-musical">
              Letra & Cifra
            </span>
          </Link>

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

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-accent transition-colors ease-musical"
            >
              <Search className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleTheme}
              className="hover:bg-accent transition-colors ease-musical"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent transition-colors ease-musical"
                >
                  <Globe className="w-4 h-4" />
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {language.toUpperCase()}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('pt')}>Português</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent transition-colors ease-musical"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile">{t('nav.profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-songs">{t('nav.mySongs')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    {t('nav.logout')}
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
                {t('nav.login')}
              </Button>
            )}

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

        {isMenuOpen && (
          <div className="lg:hidden border-t bg-card/95 backdrop-blur-sm">
            <div className="py-4 space-y-4">
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

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('nav.search')}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder={t('nav.searchPlaceholder')}
              className="pl-10"
              autoFocus
            />
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
