import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { ChordTransposer } from "@/components/music/ChordTransposer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag, 
  Calendar,
  User,
  ExternalLink,
  Music,
  ArrowLeft,
  Play,
  Download
} from "lucide-react";

// Mock song data - in real app would fetch from API
const mockSongData = {
  id: "1",
  title: "Imagine",
  artist: "John Lennon", 
  year: 1971,
  type: "chords" as const,
  originalKey: "C",
  language: "en",
  lyrics: `[C]       [F]      [C]
Imagine there's no heaven
[C]       [F]      [C]
It's easy if you try
[C]       [F]      [C] 
No hell below us
[C]       [F]      [C]
Above us only sky

[F]          [Am]    [Dm]       [F]
Imagine all the people living for today
[G]    [C/E]  [E7]  [F]  [G]  [C]
Aha-ah-ah

[C]       [F]      [C]
Imagine there's no countries  
[C]       [F]      [C]
It isn't hard to do
[C]       [F]      [C]
Nothing to kill or die for
[C]       [F]      [C]
And no religion too

[F]          [Am]    [Dm]       [F]
Imagine all the people living life in peace
[G]    [C/E]  [E7]  [F]  [G]  [C]
You-oo-oo

[F]         [G]        [C]    [E7]  [F]
You may say I'm a dreamer
[F]         [G]      [C]    [E7]  [F]
But I'm not the only one
[F]         [G]        [C]    [E7]  [F]
I hope someday you'll join us
[F]         [G]        [C]
And the world will be as one`,
  spotifyUrl: "https://open.spotify.com/track/example",
  youtubeUrl: "https://www.youtube.com/watch?v=example",
  createdBy: "musicfan123",
  createdAt: "2 days ago",
  likes: 2500,
  comments: 320,
  isLiked: false
};

const mockComments = [
  {
    id: "1",
    user: "guitarplayer99",
    content: "Great arrangement! The chord progression flows perfectly.",
    createdAt: "6 hours ago",
    likes: 12
  },
  {
    id: "2", 
    user: "music_teacher",
    content: "Perfect for beginners. I'll be using this in my classes!",
    createdAt: "1 day ago",
    likes: 8
  },
  {
    id: "3",
    user: "johnlennonfan",
    content: "This brings back so many memories. Thank you for sharing!",
    createdAt: "2 days ago", 
    likes: 15
  }
];

export const SongDetail = () => {
  const { id } = useParams();
  const [language] = useState("en");
  const [song] = useState(mockSongData);
  const [currentContent, setCurrentContent] = useState(song.lyrics);
  const [currentKey, setCurrentKey] = useState(song.originalKey);
  const [isLiked, setIsLiked] = useState(song.isLiked);
  const [likes, setLikes] = useState(song.likes);
  const [newComment, setNewComment] = useState("");
  const [comments] = useState(mockComments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    toast(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard!");
  };

  const handleReport = () => {
    toast("Thank you for reporting. We'll review this content.");
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast("Comment added successfully!");
      setNewComment("");
    }
  };

  const handleContentChange = (newContent: string, newKey: string) => {
    setCurrentContent(newContent);
    setCurrentKey(newKey);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors ease-musical mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === "en" ? "Back to Home" : "Voltar ao Início"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Song Header */}
            <Card className="bg-gradient-card shadow-elevated">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold mb-2">{song.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                      <User className="w-4 h-4" />
                      <span className="text-lg">{song.artist}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{song.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        <Music className="w-3 h-3 mr-1" />
                        {language === "en" ? "Chords" : "Cifra"}
                      </Badge>
                      <Badge variant="outline" className="border-primary text-primary">
                        Key: {song.originalKey}
                      </Badge>
                      <Badge variant="secondary">
                        {song.language === "en" ? "English" : "Português"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isLiked ? "default" : "outline"}
                      size="sm"
                      onClick={handleLike}
                      className={isLiked ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                      {likes.toLocaleString()}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReport}>
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* External Links */}
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1" asChild>
                <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" />
                  {language === "en" ? "Play on Spotify" : "Tocar no Spotify"}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" />
                  {language === "en" ? "Watch on YouTube" : "Ver no YouTube"}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </div>

            {/* Song Content */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-primary" />
                  <span>{language === "en" ? "Chords & Lyrics" : "Cifra & Letra"}</span>
                  <Badge variant="outline" className="ml-2 border-primary text-primary font-bold">
                    {currentKey}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm leading-relaxed whitespace-pre-line border-l-4 border-l-primary">
                  {currentContent}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {language === "en" ? "Download" : "Baixar"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>{language === "en" ? "Comments" : "Comentários"} ({comments.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder={language === "en" ? "Share your thoughts about this song..." : "Compartilhe sua opinião sobre esta música..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddComment} className="bg-gradient-primary">
                      {language === "en" ? "Add Comment" : "Adicionar Comentário"}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="text-sm text-foreground/90 mb-2">{comment.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                            <Heart className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="hover:text-primary transition-colors">
                            {language === "en" ? "Reply" : "Responder"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chord Transposer */}
            <ChordTransposer
              originalKey={song.originalKey}
              content={currentContent}
              onContentChange={handleContentChange}
              language={language}
            />

            {/* Song Info */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === "en" ? "Song Information" : "Informações da Música"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "en" ? "Added by:" : "Adicionado por:"}</span>
                  <span className="font-medium">{song.createdBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "en" ? "Added on:" : "Adicionado em:"}</span>
                  <span className="font-medium">{song.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "en" ? "Type:" : "Tipo:"}</span>
                  <span className="font-medium">{language === "en" ? "Chord Chart" : "Cifra"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "en" ? "Original Key:" : "Tom Original:"}</span>
                  <span className="font-bold text-primary">{song.originalKey}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "en" ? "Language:" : "Idioma:"}</span>
                  <span className="font-medium">{song.language === "en" ? "English" : "Português"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Songs */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === "en" ? "More by this Artist" : "Mais deste Artista"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Working Class Hero", "Give Peace a Chance", "Instant Karma"].map((songTitle, index) => (
                  <Link
                    key={index}
                    to={`/song/${index + 10}`}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors ease-musical group"
                  >
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {songTitle}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {song.artist}
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};