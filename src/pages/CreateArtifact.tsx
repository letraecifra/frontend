import { ArrowLeft, FileText, Guitar, Music, Sheet } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Navigation } from '~/layouts';

const artifactTypes = [
  {
    id: 'lyrics',
    title: 'Letra',
    description: 'Crie uma nova letra de música com formatação simples',
    icon: FileText,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    path: '/create/lyrics',
  },
  {
    id: 'chords',
    title: 'Cifra',
    description: 'Adicione acordes e notas musicais sincronizadas com a letra',
    icon: Music,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    path: '/create/chords',
  },
  {
    id: 'tabs',
    title: 'Tablatura',
    description: 'Faça upload de arquivos de tablatura (.gp5, .gpx, .tef)',
    icon: Guitar,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    path: '/create/tabs',
  },
  {
    id: 'sheet',
    title: 'Partitura',
    description: 'Faça upload de partituras (.pdf, .xml, .mxl)',
    icon: Sheet,
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    path: '/create/sheet',
  },
];

export function CreateArtifact(): ReactNode {
  const { type } = useParams();
  const navigate = useNavigate();

  if (type && artifactTypes.find((t) => t.id === type)) {
    return <Navigate to={`/create/${type}/form`} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Criar Novo Artefato</h1>

          <p className="text-muted-foreground">
            Escolha o tipo de conteúdo musical que deseja criar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artifactTypes.map((artifact) => {
            const Icon = artifact.icon;

            return (
              <Card
                key={artifact.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(`${artifact.path}/form`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${artifact.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Criar →
                    </Button>
                  </div>

                  <CardTitle className="text-xl">{artifact.title}</CardTitle>

                  <CardDescription className="text-sm">{artifact.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Recursos inclusos:</div>
                    <ul className="text-sm space-y-1">
                      {artifact.id === 'lyrics' && (
                        <>
                          <li>• Editor de texto simples</li>
                          <li>• Estruturação por seções</li>
                          <li>• Formatação básica</li>
                        </>
                      )}

                      {artifact.id === 'chords' && (
                        <>
                          <li>• Seleção de tom base</li>
                          <li>• Acordes vinculados à letra</li>
                          <li>• Transposição automática</li>
                        </>
                      )}

                      {artifact.id === 'tabs' && (
                        <>
                          <li>• Upload de arquivos .gp5, .gpx</li>
                          <li>• Suporte a TuxGuitar</li>
                          <li>• Visualização integrada</li>
                        </>
                      )}

                      {artifact.id === 'sheet' && (
                        <>
                          <li>• Upload de PDF e MusicXML</li>
                          <li>• Compatível com MuseScore</li>
                          <li>• Visualização interativa</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dicas Rápidas</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📝 Organizando Letras</h4>

                <p className="text-sm text-muted-foreground">
                  Use seções como [Verso], [Refrão], [Ponte] para estruturar melhor suas letras.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🎵 Cifras Eficientes</h4>

                <p className="text-sm text-muted-foreground">
                  Escolha o tom base correto para facilitar a transposição automática.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🎸 Tablatura Quality</h4>

                <p className="text-sm text-muted-foreground">
                  Arquivos .gpx oferecem melhor qualidade que .gp5 para visualização.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">🎼 Partituras Legíveis</h4>

                <p className="text-sm text-muted-foreground">
                  PDFs em alta resolução garantem melhor experiência de leitura.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
