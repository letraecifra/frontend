import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  LogIn, 
  Mail, 
  Lock, 
  Music, 
  Eye, 
  EyeOff,
  Chrome
} from "lucide-react";

export const Login = () => {
  const [language] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(language === "en" ? "Welcome back!" : "Bem-vindo de volta!");
      setIsLoading(false);
      // Redirect would happen here
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    toast(language === "en" ? `Connecting with ${provider}...` : `Conectando com ${provider}...`);
  };

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
              {language === "en" ? "Welcome Back" : "Bem-vindo de Volta"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Sign in to access your musical library" 
                : "Entre para acessar sua biblioteca musical"
              }
            </p>
          </div>

          <Card className="bg-gradient-card shadow-elevated">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {language === "en" ? "Sign In" : "Entrar"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 hover:bg-muted/50 transition-colors ease-musical"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  {language === "en" ? "Continue with Google" : "Continuar com Google"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 hover:bg-muted/50 transition-colors ease-musical"
                  onClick={() => handleSocialLogin("Twitter")}
                >
            <div className="p-1">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
                  {language === "en" ? "Continue with X/Twitter" : "Continuar com X/Twitter"}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {language === "en" ? "Or continue with email" : "Ou continue com email"}
                  </span>
                </div>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === "en" ? "Email" : "E-mail"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === "en" ? "Enter your email" : "Digite seu e-mail"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors ease-musical"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    {language === "en" ? "Password" : "Senha"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={language === "en" ? "Enter your password" : "Digite sua senha"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      {showPassword ? 
                        <EyeOff className="w-4 h-4" /> : 
                        <Eye className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      {language === "en" ? "Remember me" : "Lembrar-me"}
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-hover transition-colors ease-musical"
                  >
                    {language === "en" ? "Forgot password?" : "Esqueceu a senha?"}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-primary hover:bg-primary-hover shadow-musical transition-all ease-musical"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>{language === "en" ? "Signing in..." : "Entrando..."}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>{language === "en" ? "Sign In" : "Entrar"}</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Don't have an account?" : "Não tem uma conta?"}{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:text-primary-hover font-medium transition-colors ease-musical"
                  >
                    {language === "en" ? "Sign up" : "Cadastre-se"}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-muted-foreground">
            <p>
              {language === "en" 
                ? "By signing in, you agree to our Terms of Service and Privacy Policy" 
                : "Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};