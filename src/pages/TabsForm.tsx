import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Check, FileText, Guitar, Save, Upload, X } from 'lucide-react';
import { type DragEvent, type KeyboardEvent, type ReactNode, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Form,
  FormControl,
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
import { Navigation } from '~/layouts';

const tabsSchema = z.object({
  songName: z.string().min(1, 'Nome da música é obrigatório'),
  artist: z.string().min(1, 'Artista é obrigatório'),
  compositionYear: z.string().optional(),
  originalLanguage: z.string().min(1, 'Idioma original é obrigatório'),
  spotifyLink: z.string().url('Link do Spotify inválido').optional().or(z.literal('')),
  youtubeLink: z.string().url('Link do YouTube inválido').optional().or(z.literal('')),
  tabFile: z.any().optional(),
});

type TabsFormData = z.infer<typeof tabsSchema>;

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  type: string;
}

const languages = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
  { value: 'it', label: 'Italiano' },
  { value: 'de', label: 'Alemão' },
];

const acceptedFormats = [
  { ext: '.gp5', desc: 'Guitar Pro 5' },
  { ext: '.gpx', desc: 'Guitar Pro 6+' },
  { ext: '.tef', desc: 'TablEdit' },
  { ext: '.ptb', desc: 'PowerTab' },
];

const CURRENT_YEAR = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (CURRENT_YEAR - i).toString());

export function TabsForm(): ReactNode {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<null | UploadedFile>(null);
  const [dragActive, setDragActive] = useState(false);

  const form = useForm<TabsFormData>({
    resolver: zodResolver(tabsSchema),
    defaultValues: {
      songName: '',
      artist: '',
      compositionYear: '',
      originalLanguage: 'pt',
      spotifyLink: '',
      youtubeLink: '',
    },
  });

  function handleSubmit(data: TabsFormData): void {
    if (!uploadedFile) {
      toast.error('Por favor, faça upload de um arquivo de tablatura');
      return;
    }

    const formData = {
      ...data,
      tabFile: uploadedFile,
    };

    // eslint-disable-next-line no-console -- DEBUG:
    console.log('Tabs Form Data:', formData);
    toast.success('Tablatura salva com sucesso!');
    navigate('/dashboard');
  }

  function handleFileSelect(files: FileList | null): void {
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      toast.error('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    const validExtensions = ['.gp5', '.gpx', '.tef', '.ptb'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!validExtensions.includes(fileExtension)) {
      toast.error('Formato não suportado. Use: .gp5, .gpx, .tef, .ptb');
      return;
    }

    const uploadedFileInfo: UploadedFile = {
      file,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: fileExtension.toUpperCase(),
    };

    setUploadedFile(uploadedFileInfo);
    toast.success('Arquivo carregado com sucesso!');
  }

  function handleDrag(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  }

  function handleDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFileSelect(event.dataTransfer.files);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function removeFile(): void {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/create">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Guitar className="w-5 h-5" />
            </div>

            <h1 className="text-3xl font-bold text-foreground">Nova Tablatura</h1>
          </div>

          <p className="text-muted-foreground">Faça upload de arquivos de tablatura compatíveis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Música</CardTitle>
              <CardDescription>Dados básicos da tablatura</CardDescription>
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
                            <Input {...field} placeholder="Ex: Stairway to Heaven" />
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
                            <Input {...field} placeholder="Ex: Led Zeppelin" />
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

                  <div className="flex space-x-4">
                    <Button type="submit" className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Salvar Tablatura</span>
                    </Button>

                    <Button type="button" variant="outline">
                      Salvar como Rascunho
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload de Arquivo</CardTitle>
                <CardDescription>Formatos aceitos e informações do arquivo</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Drag and Drop Area */}
                <div
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                    ${
                      dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                    }
                  `}
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onKeyDown={handleKeyDown}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

                  <h3 className="text-lg font-medium mb-2">Clique ou arraste seu arquivo aqui</h3>

                  <p className="text-sm text-muted-foreground mb-4">Máximo 10MB por arquivo</p>

                  <Button variant="outline" size="sm">
                    Escolher Arquivo
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".gp5,.gpx,.tef,.ptb"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />

                {uploadedFile && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <Check className="w-4 h-4" />
                        </div>

                        <div>
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {uploadedFile.type} • {uploadedFile.size}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Formatos Suportados</h4>

                  <div className="grid grid-cols-2 gap-2">
                    {acceptedFormats.map((format) => (
                      <div key={format.ext} className="flex items-center space-x-2 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono">{format.ext}</span>
                        <span className="text-muted-foreground">({format.desc})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">💡 Dicas</h4>

                  <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                    <li>• Arquivos .gpx oferecem melhor qualidade</li>
                    <li>• Verifique se o arquivo abre corretamente no app original</li>
                    <li>• Prefira versões mais recentes dos formatos</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
