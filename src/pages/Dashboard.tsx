import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Music, 
  FileText, 
  Guitar, 
  Sheet, 
  Calendar, 
  Eye, 
  Edit, 
  Trash,
  Plus,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for user artifacts
const mockArtifacts = [
  {
    id: '1',
    type: 'lyrics',
    title: 'Imagine',
    artist: 'John Lennon',
    createdAt: '2024-01-15',
    views: 1240,
    status: 'published'
  },
  {
    id: '2',
    type: 'chords',
    title: 'Wonderwall',
    artist: 'Oasis',
    createdAt: '2024-01-10',
    views: 890,
    status: 'draft'
  },
  {
    id: '3',
    type: 'tabs',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    createdAt: '2024-01-08',
    views: 2100,
    status: 'published'
  }
];

const mockRecentActivity = [
  { action: 'Created lyrics for "Imagine"', time: '2 hours ago', icon: FileText },
  { action: 'Updated chord chart for "Wonderwall"', time: '1 day ago', icon: Music },
  { action: 'Published tablature for "Stairway to Heaven"', time: '3 days ago', icon: Guitar },
  { action: 'Added sheet music for "Bohemian Rhapsody"', time: '1 week ago', icon: Sheet }
];

const getArtifactIcon = (type: string) => {
  switch (type) {
    case 'lyrics': return FileText;
    case 'chords': return Music;
    case 'tabs': return Guitar;
    case 'sheet': return Sheet;
    default: return FileText;
  }
};

const getArtifactColor = (type: string) => {
  switch (type) {
    case 'lyrics': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'chords': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'tabs': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'sheet': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Olá, {user?.name || 'Usuário'}! 👋
          </h1>
          <p className="text-muted-foreground">Gerencie seus conteúdos musicais em um só lugar</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Artefatos</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,230</div>
              <p className="text-xs text-muted-foreground">+12% este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publicados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">4 rascunhos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Novos conteúdos</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Artifacts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Meus Artefatos</CardTitle>
                <CardDescription>Seus conteúdos musicais recentes</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link to="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockArtifacts.slice(0, 3).map((artifact) => {
                const Icon = getArtifactIcon(artifact.type);
                return (
                  <div key={artifact.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{artifact.title}</h4>
                        <p className="text-sm text-muted-foreground">{artifact.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getArtifactColor(artifact.type)}>
                        {artifact.type}
                      </Badge>
                      <Badge variant={artifact.status === 'published' ? 'default' : 'secondary'}>
                        {artifact.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard/artifacts">Ver Todos os Artefatos</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Suas ações mais recentes na plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Crie novos conteúdos musicais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/create/lyrics">
                  <FileText className="h-6 w-6" />
                  <span>Nova Letra</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/create/chords">
                  <Music className="h-6 w-6" />
                  <span>Nova Cifra</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/create/tabs">
                  <Guitar className="h-6 w-6" />
                  <span>Nova Tab</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link to="/create/sheet">
                  <Sheet className="h-6 w-6" />
                  <span>Nova Partitura</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};