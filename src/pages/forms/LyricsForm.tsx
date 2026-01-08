import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, Music, Save } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type LyricsFormData = z.infer<typeof lyricsSchema>;

const lyricsSchema = z.object({
  songName: z.string().min(1, 'Nome da música é obrigatório'),
  artist: z.string().min(1, 'Artista é obrigatório'),
  compositionYear: z.string().optional(),
  originalLanguage: z.string().min(1, 'Idioma original é obrigatório'),
  spotifyLink: z.string().url('Link do Spotify inválido').optional().or(z.literal('')),
  youtubeLink: z.string().url('Link do YouTube inválido').optional().or(z.literal('')),
  lyrics: z.string().min(10, 'Letra deve ter pelo menos 10 caracteres'),
  structure: z.string().optional(),
});

const CURRENT_YEAR = new Date().getFullYear();

const years = Array.from({ length: 50 }, (_, i) => (CURRENT_YEAR - i).toString());

const languages = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
  { value: 'it', label: 'Italiano' },
  { value: 'de', label: 'Alemão' },
];

export function LyricsForm(): ReactNode {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<LyricsFormData>({
    resolver: zodResolver(lyricsSchema),
    defaultValues: {
      songName: '',
      artist: '',
      compositionYear: '',
      originalLanguage: 'pt',
      spotifyLink: '',
      youtubeLink: '',
      lyrics: '',
      structure: '',
    },
  });

  const watchedLyrics = form.watch('lyrics');
  const watchedSongName = form.watch('songName');
  const watchedArtist = form.watch('artist');

  function handleSubmit(data: LyricsFormData): void {
    // eslint-disable-next-line no-console -- DEBUG:
    console.log('Lyrics Form Data:', data);
    toast.success('Letra salva com sucesso!');
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/create">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? 'Editar' : 'Visualizar'}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Music className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Nova Letra</h1>
          </div>

          <p className="text-muted-foreground">
            Crie uma nova letra de música com todos os detalhes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Música</CardTitle>
              <CardDescription>Preencha os dados básicos da música</CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="songName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Música *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ex: Imagine" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="artist"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Artista *</FormLabel>

                          <FormControl>
                            <Input {...field} placeholder="Ex: John Lennon" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="compositionYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano de Composição</FormLabel>

                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o ano" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="originalLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idioma Original *</FormLabel>

                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                  {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="spotifyLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link do Spotify</FormLabel>

                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://open.spotify.com/track/..."
                              type="url"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="youtubeLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link do YouTube</FormLabel>

                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://www.youtube.com/watch?v=..."
                              type="url"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="lyrics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Letra da Música *</FormLabel>

                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Digite a letra da música aqui...&#10;&#10;Use [Verso], [Refrão], [Ponte] para estruturar"
                            className="min-h-[300px] font-mono"
                          />
                        </FormControl>

                        <FormDescription>
                          Use seções como [Verso], [Refrão], [Ponte] para melhor organização
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-4">
                    <Button type="submit" className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Salvar Letra</span>
                    </Button>

                    <Button type="button" variant="outline">
                      Salvar como Rascunho
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visualização</CardTitle>
              <CardDescription>Como sua letra aparecerá para outros usuários</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {watchedSongName || watchedArtist ? (
                  <div>
                    <h2 className="text-2xl font-bold">{watchedSongName || 'Nome da Música'}</h2>
                    <p className="text-lg text-muted-foreground">{watchedArtist || 'Artista'}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os campos para ver a visualização</p>
                  </div>
                )}

                {watchedLyrics && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {watchedLyrics}
                    </pre>
                  </div>
                )}

                {!watchedLyrics && watchedSongName && (
                  <div className="border rounded-lg p-4 bg-muted/50 text-center text-muted-foreground">
                    Digite a letra para visualizar aqui
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
