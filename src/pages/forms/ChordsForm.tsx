import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, Music, Plus, Save, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';

type ChordsFormData = z.infer<typeof chordsSchema>;

interface ChordPosition {
  chord: string;
  position: number;
  section?: string;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());
const validKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const languages = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
  { value: 'it', label: 'Italiano' },
  { value: 'de', label: 'Alemão' },
];

const chordsSchema = z.object({
  songName: z.string().min(1, 'Nome da música é obrigatório'),
  artist: z.string().min(1, 'Artista é obrigatório'),
  compositionYear: z.string().optional(),
  originalLanguage: z.string().min(1, 'Idioma original é obrigatório'),
  spotifyLink: z.string().url('Link do Spotify inválido').optional().or(z.literal('')),
  youtubeLink: z.string().url('Link do YouTube inválido').optional().or(z.literal('')),
  baseKey: z.string().min(1, 'Tom base é obrigatório'),
  lyrics: z.string().min(10, 'Letra deve ter pelo menos 10 caracteres'),
  chords: z
    .array(
      z.object({
        position: z.number(),
        chord: z.string(),
        section: z.string().optional(),
      }),
    )
    .optional(),
});

export function ChordsForm(): ReactNode {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [chordPositions, setChordPositions] = useState<ChordPosition[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [newChord, setNewChord] = useState('');

  const form = useForm<ChordsFormData>({
    resolver: zodResolver(chordsSchema),
    defaultValues: {
      songName: '',
      artist: '',
      compositionYear: '',
      originalLanguage: 'pt',
      spotifyLink: '',
      youtubeLink: '',
      baseKey: 'C',
      lyrics: '',
      chords: [],
    },
  });

  const watchedLyrics = form.watch('lyrics');
  const watchedSongName = form.watch('songName');
  const watchedArtist = form.watch('artist');
  const watchedBaseKey = form.watch('baseKey');

  function handleSubmit(data: ChordsFormData): void {
    const formData = {
      ...data,
      chords: chordPositions,
    };

    // eslint-disable-next-line no-console -- DEBUG:
    console.log('Chords Form Data:', formData);
    toast.success('Cifra salva com sucesso!');
    navigate('/dashboard');
  }

  function handleTextSelection(): void {
    const selection = window.getSelection();

    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
    }
  }

  function handleAddChord(): void {
    if (newChord && selectedText) {
      const newChordPosition: ChordPosition = {
        position: chordPositions.length,
        chord: newChord,
        section: selectedText.substring(0, 20),
      };

      setChordPositions([...chordPositions, newChordPosition]);
      setNewChord('');
      setSelectedText('');
      toast.success('Acorde adicionado!');
    }
  }

  function handleRemoveChord(index: number): void {
    setChordPositions(chordPositions.filter((_, i) => i !== index));
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
            <div className="p-2 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Music className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Nova Cifra</h1>
          </div>
          <p className="text-muted-foreground">Crie uma cifra com acordes vinculados à letra</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Música</CardTitle>
                <CardDescription>Dados básicos e tom principal</CardDescription>
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
                              <Input {...field} placeholder="Ex: Wonderwall" />
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
                              <Input {...field} placeholder="Ex: Oasis" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="baseKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tom Base *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {validKeys.map((key) => (
                                  <SelectItem key={key} value={key}>
                                    {key}
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
                        name="compositionYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ano</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Ano" />
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
                            <FormLabel>Idioma *</FormLabel>
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
                              <Input {...field} placeholder="https://open.spotify.com/..." />
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
                              <Input {...field} placeholder="https://youtube.com/..." />
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
                              placeholder="Digite a letra aqui... Selecione partes da letra para adicionar acordes."
                              className="min-h-[200px] font-mono"
                              onMouseUp={handleTextSelection}
                            />
                          </FormControl>
                          <FormDescription>
                            Selecione partes da letra para vincular acordes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-4">
                      <Button type="submit" className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Salvar Cifra</span>
                      </Button>
                      <Button type="button" variant="outline">
                        Salvar como Rascunho
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Chord Manager */}
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Acordes</CardTitle>
                <CardDescription>Adicione acordes ao texto selecionado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedText && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Texto selecionado:</p>
                    <p className="font-mono text-sm">&quot;{selectedText}&quot;</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Input
                    placeholder="Ex: Em, G, D, C"
                    value={newChord}
                    onChange={(e) => setNewChord(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddChord} disabled={!selectedText || !newChord} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>

                {chordPositions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Acordes adicionados:</p>
                    <div className="flex flex-wrap gap-2">
                      {chordPositions.map((chord, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center space-x-2"
                        >
                          <span>{chord.chord}</span>
                          <span className="text-xs text-muted-foreground">({chord.section})</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleRemoveChord(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Visualização da Cifra</CardTitle>
              <CardDescription>Tom atual: {watchedBaseKey}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {watchedSongName || watchedArtist ? (
                  <div>
                    <h2 className="text-2xl font-bold">{watchedSongName || 'Nome da Música'}</h2>
                    <p className="text-lg text-muted-foreground">{watchedArtist || 'Artista'}</p>
                    <Badge variant="outline" className="mt-2">
                      Tom: {watchedBaseKey}
                    </Badge>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os campos para ver a visualização</p>
                  </div>
                )}

                {watchedLyrics && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {watchedLyrics}
                    </pre>
                    {chordPositions.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-2">Acordes nesta música:</p>
                        <div className="flex flex-wrap gap-2">
                          {chordPositions.map((chord, index) => (
                            <Badge key={index} variant="outline">
                              {chord.chord}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
