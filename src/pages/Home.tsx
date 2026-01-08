import { Clock, Filter, Music, PlayCircle, Search, Star, TrendingUp, Users } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Navigation } from '~/components/layout/Navigation';
import { HeroCarousel } from '~/components/music/HeroCarousel';
import { SongCard } from '~/components/music/SongCard';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useLanguage } from '~/contexts/LanguageContext';

// FIXME: mock data for the prototype
const mockSongs = [
  {
    id: '1',
    title: 'Imagine',
    artist: 'John Lennon',
    year: 1971,
    type: 'chords' as const,
    likes: 2500,
    comments: 320,
    key: 'C',
    language: 'en',
    createdBy: 'musicfan123',
    createdAt: '2 days ago',
    isLiked: true,
  },
  {
    id: '2',
    title: 'Garota de Ipanema',
    artist: 'Tom Jobim',
    year: 1964,
    type: 'chords' as const,
    likes: 1800,
    comments: 245,
    key: 'F',
    language: 'pt',
    createdBy: 'bossanova_lover',
    createdAt: '5 days ago',
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: 1975,
    type: 'lyrics' as const,
    likes: 3200,
    comments: 890,
    language: 'en',
    createdBy: 'rock_historian',
    createdAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    year: 1971,
    type: 'tabs' as const,
    likes: 4100,
    comments: 756,
    language: 'en',
    createdBy: 'guitarmaster',
    createdAt: '3 days ago',
    isLiked: true,
  },
  {
    id: '5',
    title: 'Aquarela',
    artist: 'Toquinho',
    year: 1983,
    type: 'chords' as const,
    likes: 920,
    comments: 134,
    key: 'G',
    language: 'pt',
    createdBy: 'mpb_classics',
    createdAt: '1 day ago',
  },
  {
    id: '6',
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    year: 1694,
    type: 'sheet' as const,
    likes: 1500,
    comments: 89,
    language: 'en',
    createdBy: 'classical_music',
    createdAt: '6 days ago',
  },
];

// FIXME: mock data for the stats
const mockStats = {
  totalSongs: 45632,
  totalArtists: 12489,
  totalUsers: 89543,
  songsThisWeek: 324,
};

export function Home(): ReactNode {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function getTabContent(tab: string): typeof mockSongs {
    switch (tab) {
      case 'latest':
        return filteredSongs.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      case 'popular':
        return filteredSongs.sort((a, b) => b.likes - a.likes);

      case 'trending':
        return filteredSongs.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));

      default:
        return filteredSongs;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />

      <section className="bg-gradient-primary relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="block lg:hidden">
          <div className="container mx-auto px-4 pt-8 relative z-10">
            <div className="mb-8">
              <HeroCarousel className="max-w-sm mx-auto" />
            </div>

            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none z-20"></div>

            <div className="text-center max-w-4xl mx-auto pb-16">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                <span className="block">{t('home.heroTitle1')}</span>
                <span className="block bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  {t('home.heroTitle2')}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {t('home.heroSubtitle')}
              </p>

              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/60 w-5 h-5" />

                  <Input
                    type="search"
                    placeholder={t('home.searchPlaceholder')}
                    className="pl-12 pr-4 py-4 text-lg bg-card/95 backdrop-blur-sm border-2 border-white/20 focus:border-white/40 rounded-xl shadow-elevated"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex justify-center mt-4 space-x-2 flex-wrap gap-y-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-primary-foreground border-white/30"
                  >
                    45K+ {t('home.songsCount')}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-primary-foreground border-white/30"
                  >
                    12K+ {t('home.artistsCount')}
                  </Badge>

                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-primary-foreground border-white/30"
                  >
                    89K+ {t('home.musiciansCount')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div className="text-left max-w-2xl">
                <h1 className="text-4xl xl:text-6xl font-bold text-primary-foreground mb-6">
                  <span className="block">{t('home.heroTitle1')}</span>
                  <span className="block bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                    {t('home.heroTitle2')}
                  </span>
                </h1>

                <p className="text-xl xl:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                  {t('home.heroSubtitle')}
                </p>

                <div className="max-w-xl relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/60 w-5 h-5" />

                    <Input
                      type="search"
                      placeholder={t('home.searchPlaceholder')}
                      className="pl-12 pr-4 py-4 text-lg bg-card/95 backdrop-blur-sm border-2 border-white/20 focus:border-white/40 rounded-xl shadow-elevated"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex mt-4 space-x-2 flex-wrap gap-y-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-primary-foreground border-white/30"
                    >
                      45K+ {t('home.songsCount')}
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-primary-foreground border-white/30"
                    >
                      12K+ {t('home.artistsCount')}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-primary-foreground border-white/30"
                    >
                      89K+ {t('home.musiciansCount')}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-12 inset-y-0 w-24 bg-gradient-to-r from-primary via-primary/80 to-transparent pointer-events-none z-10"></div>

                <HeroCarousel className="relative z-20" />

                <div className="absolute -right-12 inset-y-0 w-24 bg-gradient-to-l from-primary via-primary/60 to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>

              <div className="text-2xl font-bold text-foreground">
                {mockStats.totalSongs.toLocaleString()}
              </div>

              <div className="text-muted-foreground">{t('home.songsCount')}</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>

              <div className="text-2xl font-bold text-foreground">
                {mockStats.totalArtists.toLocaleString()}
              </div>

              <div className="text-muted-foreground">{t('home.artistsCount')}</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <PlayCircle className="w-6 h-6 text-primary-foreground" />
              </div>

              <div className="text-2xl font-bold text-foreground">
                {mockStats.totalUsers.toLocaleString()}
              </div>

              <div className="text-muted-foreground">{t('home.musiciansCount')}</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>

              <div className="text-2xl font-bold text-foreground">
                {mockStats.songsThisWeek.toLocaleString()}
              </div>

              <div className="text-muted-foreground">{t('home.thisWeekCount')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {t('home.discoverMusic')}
                </h2>

                <p className="text-muted-foreground">{t('home.discoverSubtitle')}</p>
              </div>

              <Button variant="outline" size="sm" className="hidden md:flex">
                <Filter className="w-4 h-4 mr-2" />
                {t('home.filter')}
              </Button>
            </div>

            <TabsList className="grid w-full grid-cols-3 max-w-md mb-8 bg-muted/50">
              <TabsTrigger
                value="latest"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <Clock className="w-4 h-4 mr-2" />
                {t('home.latest')}
              </TabsTrigger>

              <TabsTrigger
                value="popular"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <Star className="w-4 h-4 mr-2" />
                {t('home.popular')}
              </TabsTrigger>

              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {t('home.trending')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="latest" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTabContent('latest').map((song) => (
                  <SongCard key={song.id} {...song} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTabContent('popular').map((song) => (
                  <SongCard key={song.id} {...song} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTabContent('trending').map((song) => (
                  <SongCard key={song.id} {...song} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground transition-all ease-musical"
            >
              {t('home.loadMore')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
