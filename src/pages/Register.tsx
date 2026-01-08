import { Chrome, Eye, EyeOff, Lock, Mail, Music, User, UserPlus } from 'lucide-react';
import { type FormEvent, type ReactNode, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';
import { useLanguage } from '~/contexts';
import { Navigation } from '~/layouts';

export function Register(): ReactNode {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(field: string, value: string): void {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm(): boolean {
    if (!formData.name.trim()) {
      toast.error(language === 'en' ? 'Name is required' : 'Nome é obrigatório');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error(language === 'en' ? 'Email is required' : 'E-mail é obrigatório');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error(
        language === 'en'
          ? 'Password must be at least 6 characters'
          : 'Senha deve ter pelo menos 6 caracteres',
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(language === 'en' ? "Passwords don't match" : 'Senhas não coincidem');
      return false;
    }
    if (!agreeToTerms) {
      toast.error(language === 'en' ? 'Please agree to the terms' : 'Por favor, aceite os termos');
      return false;
    }

    return true;
  }

  async function handleRegister(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // FIXME: simulate API call
    setTimeout(() => {
      toast.success(
        language === 'en' ? 'Account created successfully!' : 'Conta criada com sucesso!',
      );
      setIsLoading(false);
      // Redirect would happen here
    }, 1500);
  }

  function handleSocialLogin(provider: string): void {
    toast(language === 'en' ? `Connecting with ${provider}...` : `Conectando com ${provider}...`);
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-musical">
              <Music className="w-8 h-8 text-primary-foreground" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === 'en' ? 'Join Our Community' : 'Junte-se à Nossa Comunidade'}
            </h1>

            <p className="text-muted-foreground">
              {language === 'en'
                ? 'Create your account and start sharing music'
                : 'Crie sua conta e comece a compartilhar música'}
            </p>
          </div>

          <Card className="bg-gradient-card shadow-elevated">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {language === 'en' ? 'Create Account' : 'Criar Conta'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Registration */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 hover:bg-muted/50 transition-colors ease-musical"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  {language === 'en' ? 'Sign up with Google' : 'Cadastrar com Google'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 hover:bg-muted/50 transition-colors ease-musical"
                  onClick={() => handleSocialLogin('Twitter')}
                >
                  <div className="p-1">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>

                  {language === 'en' ? 'Sign up with X/Twitter' : 'Cadastrar com X/Twitter'}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {language === 'en' ? 'Or create with email' : 'Ou criar com email'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === 'en' ? 'Full Name' : 'Nome Completo'}</Label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

                    <Input
                      id="name"
                      type="text"
                      placeholder={
                        language === 'en' ? 'Enter your full name' : 'Digite seu nome completo'
                      }
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors ease-musical"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === 'en' ? 'Email' : 'E-mail'}</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

                    <Input
                      id="email"
                      type="email"
                      placeholder={language === 'en' ? 'Enter your email' : 'Digite seu e-mail'}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors ease-musical"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{language === 'en' ? 'Password' : 'Senha'}</Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={
                        language === 'en'
                          ? 'Create a password (min. 6 characters)'
                          : 'Crie uma senha (mín. 6 caracteres)'
                      }
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors ease-musical"
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {language === 'en' ? 'Confirm Password' : 'Confirmar Senha'}
                  </Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={
                        language === 'en' ? 'Confirm your password' : 'Confirme sua senha'
                      }
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors ease-musical"
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="mt-0.5"
                  />

                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    {language === 'en' ? (
                      <>
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:text-primary-hover">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:text-primary-hover">
                          Privacy Policy
                        </Link>
                      </>
                    ) : (
                      <>
                        Concordo com os{' '}
                        <Link to="/terms" className="text-primary hover:text-primary-hover">
                          Termos de Serviço
                        </Link>{' '}
                        e{' '}
                        <Link to="/privacy" className="text-primary hover:text-primary-hover">
                          Política de Privacidade
                        </Link>
                      </>
                    )}
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-primary hover:bg-primary-hover shadow-musical transition-all ease-musical"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>{language === 'en' ? 'Creating account...' : 'Criando conta...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>{language === 'en' ? 'Create Account' : 'Criar Conta'}</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Already have an account?' : 'Já tem uma conta?'}{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary-hover font-medium transition-colors ease-musical"
                  >
                    {language === 'en' ? 'Sign in' : 'Entrar'}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
