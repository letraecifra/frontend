import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Music, 
  User, 
  Calendar,
  Play,
  Guitar,
  FileText,
  Music4
} from "lucide-react";
import { Link } from "react-router-dom";

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  year?: number;
  type: "lyrics" | "chords" | "tabs" | "sheet";
  likes: number;
  comments: number;
  key?: string;
  language: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  createdBy: string;
  createdAt: string;
  isLiked?: boolean;
}

export const SongCard = ({ 
  id, 
  title, 
  artist, 
  year, 
  type, 
  likes, 
  comments, 
  key, 
  language,
  createdBy,
  createdAt,
  isLiked = false 
}: SongCardProps) => {
  const getTypeIcon = () => {
    switch (type) {
      case "lyrics": return <FileText className="w-4 h-4" />;
      case "chords": return <Music className="w-4 h-4" />;
      case "tabs": return <Guitar className="w-4 h-4" />;
      case "sheet": return <Music4 className="w-4 h-4" />;
      default: return <Music className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "lyrics": return language === "en" ? "Lyrics" : "Letra";
      case "chords": return language === "en" ? "Chords" : "Cifra";
      case "tabs": return language === "en" ? "Tablature" : "Tablatura";
      case "sheet": return language === "en" ? "Sheet Music" : "Partitura";
      default: return "Music";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "lyrics": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "chords": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "tabs": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "sheet": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 ease-musical hover:scale-[1.02] group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <Link 
              to={`/song/${id}`} 
              className="block group-hover:text-primary transition-colors ease-musical"
            >
              <h3 className="font-semibold text-lg leading-tight mb-1 truncate">{title}</h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="w-3 h-3 flex-shrink-0" />
                <span className="text-sm truncate">{artist}</span>
                {year && (
                  <>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{year}</span>
                  </>
                )}
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 ml-2">
            <Badge className={`${getTypeColor()} text-xs`}>
              <span className="flex items-center space-x-1">
                {getTypeIcon()}
                <span>{getTypeLabel()}</span>
              </span>
            </Badge>
            {key && type === "chords" && (
              <Badge variant="outline" className="text-xs border-musical-key text-musical-key">
                {key}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              <span>{likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{createdAt}</span>
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity ease-musical hover:bg-primary/10 hover:text-primary"
          >
            <Play className="w-4 h-4 mr-1" />
            <span className="text-xs">
              {language === "en" ? "View" : "Ver"}
            </span>
          </Button>
        </div>

        <div className="mt-2 pt-2 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            {language === "en" ? "Added by" : "Adicionado por"} <span className="font-medium text-foreground">{createdBy}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};