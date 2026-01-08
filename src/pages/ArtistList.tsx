import { Filter, Grid3X3, List, Music, Search, TrendingUp, Users } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Navigation } from '~/layouts';

// FIXME: mock data for the prototype
const mockArtists = [
  {
    id: '1',
    name: 'John Lennon',
    songCount: 15,
    totalLikes: 12500,
    genres: ['Rock', 'Folk'],
    country: 'UK',
    image: '/api/placeholder/100/100',
  },
  {
    id: '2',
    name: 'Tom Jobim',
    songCount: 23,
    totalLikes: 8900,
    genres: ['Bossa Nova', 'Jazz'],
    country: 'Brazil',
    image: '/api/placeholder/100/100',
  },
  {
    id: '3',
    name: 'Queen',
    songCount: 45,
    totalLikes: 25600,
    genres: ['Rock', 'Opera Rock'],
    country: 'UK',
    image: '/api/placeholder/100/100',
  },
  {
    id: '4',
    name: 'Led Zeppelin',
    songCount: 32,
    totalLikes: 19800,
    genres: ['Hard Rock', 'Blues Rock'],
    country: 'UK',
    image: '/api/placeholder/100/100',
  },
  {
    id: '5',
    name: 'Toquinho',
    songCount: 28,
    totalLikes: 6700,
    genres: ['MPB', 'Folk'],
    country: 'Brazil',
    image: '/api/placeholder/100/100',
  },
  {
    id: '6',
    name: 'Johann Pachelbel',
    songCount: 8,
    totalLikes: 3400,
    genres: ['Classical', 'Baroque'],
    country: 'Germany',
    image: '/api/placeholder/100/100',
  },
];

export function ArtistList(): ReactNode {
  const [language] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'likes' | 'name' | 'songs'>('name');

  const filteredArtists = mockArtists
    .filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.totalLikes - a.totalLikes;
        case 'songs':
          return b.songCount - a.songCount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {language === 'en' ? 'Artists' : 'Artistas'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'en'
              ? 'Discover talented musicians from around the world'
              : 'Descubra músicos talentosos de todo o mundo'}
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />

                <Input
                  type="search"
                  placeholder={
                    language === 'en'
                      ? 'Search artists or genres...'
                      : 'Buscar artistas ou gêneros...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors ease-musical"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {language === 'en' ? 'Sort by:' : 'Ordenar por:'}
                </span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 bg-muted/50 border border-muted-foreground/20 rounded-md text-sm focus:border-primary transition-colors ease-musical"
                >
                  <option value="name">{language === 'en' ? 'Name' : 'Nome'}</option>
                  <option value="songs">{language === 'en' ? 'Songs' : 'Músicas'}</option>
                  <option value="likes">{language === 'en' ? 'Popularity' : 'Popularidade'}</option>
                </select>
              </div>

              <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>

                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {language === 'en'
              ? `${filteredArtists.length} artists found`
              : `${filteredArtists.length} artistas encontrados`}
          </p>

          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Filters' : 'Filtros'}
          </Button>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => (
              <Link key={artist.id} to={`/artist/${artist.id}`}>
                <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 ease-musical hover:scale-[1.02] group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-musical group-hover:scale-110 transition-transform ease-musical">
                      <Users className="w-10 h-10 text-primary-foreground" />
                    </div>

                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors ease-musical">
                      {artist.name}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center space-x-1">
                        <Music className="w-3 h-3" />

                        <span>
                          {artist.songCount} {language === 'en' ? 'songs' : 'músicas'}
                        </span>
                      </div>

                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp className="w-3 h-3" />

                        <span>
                          {artist.totalLikes.toLocaleString()}{' '}
                          {language === 'en' ? 'likes' : 'curtidas'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1 mt-3">
                      {artist.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">{artist.country}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArtists.map((artist) => (
              <Link key={artist.id} to={`/artist/${artist.id}`}>
                <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 ease-musical group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shrink-0 shadow-musical group-hover:scale-110 transition-transform ease-musical">
                        <Users className="w-8 h-8 text-primary-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors ease-musical">
                          {artist.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <Music className="w-4 h-4" />

                            <span>
                              {artist.songCount} {language === 'en' ? 'songs' : 'músicas'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />

                            <span>
                              {artist.totalLikes.toLocaleString()}{' '}
                              {language === 'en' ? 'likes' : 'curtidas'}
                            </span>
                          </div>

                          <span>{artist.country}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {artist.genres.map((genre) => (
                            <Badge key={genre} variant="secondary" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-primary hover:text-primary-foreground transition-all ease-musical"
          >
            {language === 'en' ? 'Load More Artists' : 'Carregar Mais Artistas'}
          </Button>
        </div>
      </div>
    </div>
  );
}
