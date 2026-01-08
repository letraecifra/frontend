import {
  Calendar,
  Clock,
  Edit,
  Eye,
  FileText,
  Guitar,
  MoreHorizontal,
  Music,
  Plus,
  Search,
  Sheet,
  Trash,
  TrendingUp,
} from 'lucide-react';
import { type ComponentType, type ReactNode, useState } from 'react';
import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Navigation } from '~/layouts';

// FIXME: mock data for user artifacts
const mockArtifacts = [
  {
    id: '1',
    type: 'lyrics',
    title: 'Imagine',
    artist: 'John Lennon',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    views: 1240,
    status: 'published',
    language: 'en',
  },
  {
    id: '2',
    type: 'chords',
    title: 'Wonderwall',
    artist: 'Oasis',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    views: 890,
    status: 'draft',
    language: 'en',
  },
  {
    id: '3',
    type: 'tabs',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    views: 2100,
    status: 'published',
    language: 'en',
  },
  {
    id: '4',
    type: 'sheet',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-06',
    views: 3200,
    status: 'published',
    language: 'en',
  },
  {
    id: '5',
    type: 'lyrics',
    title: 'Garota de Ipanema',
    artist: 'Tom Jobim',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-04',
    views: 567,
    status: 'published',
    language: 'pt',
  },
  {
    id: '6',
    type: 'chords',
    title: 'Águas de Março',
    artist: 'Tom Jobim',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
    views: 445,
    status: 'draft',
    language: 'pt',
  },
];

function getArtifactIcon(type: string): ComponentType<{ className: string }> {
  switch (type) {
    case 'chords':
      return Music;

    case 'lyrics':
      return FileText;

    case 'sheet':
      return Sheet;

    case 'tabs':
      return Guitar;

    default:
      return FileText;
  }
}

function getArtifactColor(type: string): string {
  switch (type) {
    case 'chords':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';

    case 'lyrics':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';

    case 'sheet':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';

    case 'tabs':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';

    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

function getArtifactLabel(type: string): string {
  switch (type) {
    case 'chords':
      return 'Cifra';

    case 'lyrics':
      return 'Letra';

    case 'sheet':
      return 'Partitura';

    case 'tabs':
      return 'Tablatura';

    default:
      return 'Artefato';
  }
}

export function ManageArtifacts(): ReactNode {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filteredArtifacts = mockArtifacts
    .filter((artifact) => {
      const matchesSearch =
        artifact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || artifact.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || artifact.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  function handleDelete(id: string): void {
    // eslint-disable-next-line no-console -- DEBUG:
    console.log('Delete artifact:', id);
    // FIXME: mock delete - would normally make API call
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meus Artefatos</h1>

            <p className="text-muted-foreground">Gerencie todos os seus conteúdos musicais</p>
          </div>

          <Button asChild>
            <Link to="/create">
              <Plus className="w-4 h-4 mr-2" />
              Criar Novo
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{mockArtifacts.length}</p>
                </div>
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Publicados</p>
                  <p className="text-2xl font-bold">
                    {mockArtifacts.filter((a) => a.status === 'published').length}
                  </p>
                </div>

                <Eye className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rascunhos</p>
                  <p className="text-2xl font-bold">
                    {mockArtifacts.filter((a) => a.status === 'draft').length}
                  </p>
                </div>
                <Edit className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Visualizações</p>
                  <p className="text-2xl font-bold">
                    {mockArtifacts
                      .reduce((acc, artifact) => acc + artifact.views, 0)
                      .toLocaleString()}
                  </p>
                </div>

                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por título ou artista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="lyrics">Letras</SelectItem>
                    <SelectItem value="chords">Cifras</SelectItem>
                    <SelectItem value="tabs">Tablaturas</SelectItem>
                    <SelectItem value="sheet">Partituras</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="published">Publicados</SelectItem>
                    <SelectItem value="draft">Rascunhos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigos</SelectItem>
                    <SelectItem value="views">Mais visualizados</SelectItem>
                    <SelectItem value="title">Por título</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredArtifacts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

                <h3 className="text-lg font-medium mb-2">Nenhum artefato encontrado</h3>

                <p className="text-muted-foreground mb-4">
                  {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Crie seu primeiro conteúdo musical!'}
                </p>

                <Button asChild>
                  <Link to="/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Artefato
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredArtifacts.map((artifact) => {
              const Icon = getArtifactIcon(artifact.type);

              return (
                <Card key={artifact.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getArtifactColor(artifact.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{artifact.title}</h3>

                            <Badge className={getArtifactColor(artifact.type)}>
                              {getArtifactLabel(artifact.type)}
                            </Badge>

                            <Badge
                              variant={artifact.status === 'published' ? 'default' : 'secondary'}
                            >
                              {artifact.status === 'published' ? 'Publicado' : 'Rascunho'}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground">{artifact.artist}</p>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Criado em {new Date(artifact.createdAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 w-3" />
                              <span>
                                Atualizado em{' '}
                                {new Date(artifact.updatedAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{artifact.views.toLocaleString()} visualizações</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicar</DropdownMenuItem>
                            <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                            <DropdownMenuItem>Exportar</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(artifact.id)}
                            >
                              <Trash className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {filteredArtifacts.length > 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredArtifacts.length} de {mockArtifacts.length} artefatos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
