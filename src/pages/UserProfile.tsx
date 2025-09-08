import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Navigation } from "@/components/layout/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Camera, Save, User } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  bio: z.string().max(500, "Bio deve ter no máximo 500 caracteres").optional(),
  location: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
      location: "São Paulo, Brasil",
      website: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
    setIsEditing(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleAvatarChange = () => {
    toast.info("Funcionalidade de upload em desenvolvimento");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Foto do Perfil</CardTitle>
              <CardDescription>Sua imagem pública na plataforma</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.charAt(0) || <User className="w-8 h-8" />}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full p-2"
                  onClick={handleAvatarChange}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Membro desde {new Date(user?.createdAt || '').toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados pessoais</CardDescription>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                placeholder="Seu nome completo"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                type="email"
                                placeholder="seu@email.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biografia</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="Conte um pouco sobre você e sua paixão pela música..."
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormDescription>
                            Máximo de 500 caracteres
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localização</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                placeholder="Cidade, Estado"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                placeholder="https://seusite.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <Button type="submit" className="flex items-center space-x-2">
                          <Save className="w-4 h-4" />
                          <span>Salvar Alterações</span>
                        </Button>
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Account Statistics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Estatísticas da Conta</CardTitle>
            <CardDescription>Resumo da sua atividade na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Artefatos Criados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.2k</div>
                <div className="text-sm text-muted-foreground">Visualizações</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Publicados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">89</div>
                <div className="text-sm text-muted-foreground">Curtidas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};