import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { SongCard } from "@/components/music/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Star, 
  Music, 
  Users, 
  PlayCircle,
  Filter
} from "lucide-react";

// Mock data for the prototype
const mockSongs = [
  {
    id: "1",
    title: "Imagine",
    artist: "John Lennon",
    year: 1971,
    type: "chords" as const,
    likes: 2500,
    comments: 320,
    key: "C",
    language: "en",
    createdBy: "musicfan123",
    createdAt: "2 days ago",
    isLiked: true
  },
  {
    id: "2", 
    title: "Garota de Ipanema",
    artist: "Tom Jobim",
    year: 1964,
    type: "chords" as const,
    likes: 1800,
    comments: 245,
    key: "F",
    language: "pt",
    createdBy: "bossanova_lover",
    createdAt: "5 days ago"
  },
  {
    id: "3",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    type: "lyrics" as const,
    likes: 3200,
    comments: 890,
    language: "en",
    createdBy: "rock_historian",
    createdAt: "1 week ago"
  },
  {
    id: "4",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin", 
    year: 1971,
    type: "tabs" as const,
    likes: 4100,
    comments: 756,
    language: "en",
    createdBy: "guitarmaster",
    createdAt: "3 days ago",
    isLiked: true
  },
  {
    id: "5",
    title: "Aquarela",
    artist: "Toquinho",
    year: 1983,
    type: "chords" as const,
    likes: 920,
    comments: 134,
    key: "G",
    language: "pt",
    createdBy: "mpb_classics",
    createdAt: "1 day ago"
  },
  {
    id: "6",
    title: "Canon in D",
    artist: "Johann Pachelbel",
    year: 1694,
    type: "sheet" as const,
    likes: 1500,
    comments: 89,
    language: "en",
    createdBy: "classical_music",
    createdAt: "6 days ago"
  }
];

const mockStats = {
  totalSongs: 45632,
  totalArtists: 12489,
  totalUsers: 89543,
  songsThisWeek: 324
};

export const Home = () => {
  const [language] = useState("en");
  const [activeTab, setActiveTab] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = mockSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTabContent = (tab: string) => {
    switch (tab) {
      case "latest":
        return filteredSongs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "popular":
        return filteredSongs.sort((a, b) => b.likes - a.likes);
      case "trending":
        return filteredSongs.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
      default:
        return filteredSongs;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              <span className="block">
                {language === "en" ? "Share Your" : "Compartilhe Sua"}
              </span>
              <span className="block bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                {language === "en" ? "Musical Story" : "História Musical"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              {language === "en" 
                ? "The ultimate platform for sharing lyrics, chords, tablatures, and sheet music with musicians worldwide."
                : "A plataforma definitiva para compartilhar letras, cifras, tablaturas e partituras com músicos do mundo todo."
              }
            </p>
            
            {/* Hero Search */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/60 w-5 h-5" />
                <Input
                  type="search"
                  placeholder={language === "en" ? "Search for songs, artists, or chords..." : "Buscar músicas, artistas ou acordes..."}
                  className="pl-12 pr-4 py-4 text-lg bg-card/95 backdrop-blur-sm border-2 border-white/20 focus:border-white/40 rounded-xl shadow-elevated"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                  {language === "en" ? "45K+ Songs" : "45K+ Músicas"}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                  {language === "en" ? "12K+ Artists" : "12K+ Artistas"}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                  {language === "en" ? "89K+ Users" : "89K+ Usuários"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{mockStats.totalSongs.toLocaleString()}</div>
              <div className="text-muted-foreground">{language === "en" ? "Songs" : "Músicas"}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{mockStats.totalArtists.toLocaleString()}</div>
              <div className="text-muted-foreground">{language === "en" ? "Artists" : "Artistas"}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <PlayCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{mockStats.totalUsers.toLocaleString()}</div>
              <div className="text-muted-foreground">{language === "en" ? "Musicians" : "Músicos"}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-musical">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{mockStats.songsThisWeek.toLocaleString()}</div>
              <div className="text-muted-foreground">{language === "en" ? "This Week" : "Esta Semana"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {language === "en" ? "Discover Music" : "Descobrir Música"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "en" 
                    ? "Explore the latest additions and community favorites"
                    : "Explore as últimas adições e favoritos da comunidade"
                  }
                </p>
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Filter className="w-4 h-4 mr-2" />
                {language === "en" ? "Filter" : "Filtrar"}
              </Button>
            </div>

            <TabsList className="grid w-full grid-cols-3 max-w-md mb-8 bg-muted/50">
              <TabsTrigger value="latest" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {language === "en" ? "Latest" : "Recentes"}
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <Star className="w-4 h-4 mr-2" />
                {language === "en" ? "Popular" : "Popular"}
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />
                {language === "en" ? "Trending" : "Tendência"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="latest" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTabContent("latest").map((song) => (
                  <SongCard key={song.id} {...song} language={language} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTabContent("popular").map((song) => (
                  <SongCard key={song.id} {...song} language={language} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTabContent("trending").map((song) => (
                  <SongCard key={song.id} {...song} language={language} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:bg-primary hover:text-primary-foreground transition-all ease-musical"
            >
              {language === "en" ? "Load More Songs" : "Carregar Mais Músicas"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};