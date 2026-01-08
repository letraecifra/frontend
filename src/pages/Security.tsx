import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertTriangle,
  Check,
  Clock,
  Key,
  Mail,
  MapPin,
  Monitor,
  Shield,
  Smartphone,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Navigation } from '~/components/layout/Navigation';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Switch } from '~/components/ui/switch';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string().min(8, 'Nova senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

// FIXME: mock data for user sessions and security settings
const mockSessions = [
  {
    id: '1',
    device: 'Chrome no Windows',
    location: 'São Paulo, Brasil',
    lastActive: '2024-01-15 14:30',
    current: true,
    ip: '192.168.1.100',
  },
  {
    id: '2',
    device: 'Safari no iPhone',
    location: 'São Paulo, Brasil',
    lastActive: '2024-01-14 09:15',
    current: false,
    ip: '192.168.1.101',
  },
  {
    id: '3',
    device: 'Firefox no Ubuntu',
    location: 'Rio de Janeiro, Brasil',
    lastActive: '2024-01-10 16:45',
    current: false,
    ip: '10.0.0.50',
  },
];

export function Security(): ReactNode {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    emailNotifications: true,
    loginAlerts: true,
    sessionTimeout: true,
  });

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function handlePasswordSubmit(data: PasswordFormData): void {
    // eslint-disable-next-line no-console -- DEBUG:
    console.log('Password change:', data);

    toast.success('Senha alterada com sucesso!');
    form.reset();
  }

  function toggleSetting(setting: keyof typeof securitySettings): void {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    toast.success('Configuração atualizada!');
  }

  function terminateSession(_sessionId: string): void {
    toast.success('Sessão encerrada com sucesso!');
  }

  function terminateAllSessions(): void {
    toast.success('Todas as outras sessões foram encerradas!');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Segurança</h1>
          </div>

          <p className="text-muted-foreground">
            Gerencie suas configurações de segurança e privacidade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Alterar Senha</span>
              </CardTitle>

              <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha Atual</FormLabel>

                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>

                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>

                        <FormDescription>
                          Mínimo 8 caracteres, com letras, números e símbolos
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nova Senha</FormLabel>

                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Alterar Senha
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Configurações de Segurança</span>
              </CardTitle>

              <CardDescription>Configure as opções de segurança da sua conta</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span className="font-medium">Autenticação em Duas Etapas</span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>

                <Switch
                  checked={securitySettings.twoFactor}
                  onCheckedChange={() => toggleSetting('twoFactor')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">Notificações por Email</span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Receba alertas sobre atividades da conta
                  </p>
                </div>

                <Switch
                  checked={securitySettings.emailNotifications}
                  onCheckedChange={() => toggleSetting('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Alertas de Login</span>
                  </div>

                  <p className="text-sm text-muted-foreground">Notificações sobre novos logins</p>
                </div>

                <Switch
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={() => toggleSetting('loginAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Timeout de Sessão</span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Logout automático após inatividade
                  </p>
                </div>

                <Switch
                  checked={securitySettings.sessionTimeout}
                  onCheckedChange={() => toggleSetting('sessionTimeout')}
                />
              </div>

              {!securitySettings.twoFactor && (
                <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">Recomendação de Segurança</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Ative a autenticação em duas etapas para maior segurança.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Sessões Ativas</span>
              </CardTitle>

              <CardDescription>Gerencie os dispositivos conectados à sua conta</CardDescription>
            </div>

            <Button variant="outline" onClick={terminateAllSessions}>
              Encerrar Todas as Outras
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {mockSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Monitor className="w-8 h-8 text-muted-foreground" />

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{session.device}</span>

                        {session.current && (
                          <Badge variant="default" className="text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Atual
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{session.location}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{session.lastActive}</span>
                        </div>

                        <span>IP: {session.ip}</span>
                      </div>
                    </div>
                  </div>

                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => terminateSession(session.id)}
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Encerrar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dicas de Segurança</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                  ✅ Práticas Recomendadas
                </h4>

                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use senhas únicas e fortes</li>
                  <li>• Ative a autenticação em duas etapas</li>
                  <li>• Mantenha o software atualizado</li>
                  <li>• Revise regularmente as sessões ativas</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">⚠️ Evite</h4>

                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Compartilhar suas credenciais</li>
                  <li>• Usar redes Wi-Fi públicas para login</li>
                  <li>• Ignorar alertas de segurança</li>
                  <li>• Deixar sessões abertas em dispositivos compartilhados</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
