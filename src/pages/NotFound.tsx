import { ArrowLeft, Home, Music } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { useLanguage } from '~/contexts/LanguageContext';
import { Navigation } from '~/layouts';

export function NotFound(): ReactNode {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-musical">
              <Music className="w-10 h-10 text-primary-foreground" />
            </div>

            <h1 className="text-6xl font-bold text-foreground mb-4">{t('notFound.title')}</h1>

            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('notFound.message')}</h2>

            <p className="text-muted-foreground text-lg">{t('notFound.description')}</p>
          </div>

          <Card className="bg-gradient-card shadow-elevated">
            <CardContent className="p-8">
              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full h-12 bg-gradient-primary hover:bg-primary-hover shadow-musical transition-all ease-musical"
                >
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    {t('notFound.returnHome')}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full h-12 hover:bg-accent transition-colors ease-musical"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
