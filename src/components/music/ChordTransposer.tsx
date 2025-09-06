import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Music, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Musical notes in chromatic order
const NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const CHORD_REGEX = /\b[A-G][#b]?(?:maj|min|m|dim|aug|sus|add|\d)*\b/g;

interface ChordTransposerProps {
  originalKey: string;
  content: string;
  onContentChange: (newContent: string, newKey: string) => void;
}

export const ChordTransposer = ({ 
  originalKey, 
  content, 
  onContentChange
}: ChordTransposerProps) => {
  const { t } = useLanguage();
  const [currentKey, setCurrentKey] = useState(originalKey);

  const transposeChord = useCallback((chord: string, semitones: number): string => {
    const chordMatch = chord.match(/^([A-G][#b]?)(.*)/);
    if (!chordMatch) return chord;

    const [, root, suffix] = chordMatch;
    const currentIndex = NOTES.indexOf(root);
    if (currentIndex === -1) return chord;

    let newIndex = (currentIndex + semitones) % 12;
    if (newIndex < 0) newIndex += 12;

    return NOTES[newIndex] + suffix;
  }, []);

  const transposeContent = useCallback((targetKey: string) => {
    const originalIndex = NOTES.indexOf(originalKey);
    const targetIndex = NOTES.indexOf(targetKey);
    
    if (originalIndex === -1 || targetIndex === -1) return;

    const semitones = targetIndex - originalIndex;
    
    const transposedContent = content.replace(CHORD_REGEX, (chord) => 
      transposeChord(chord, semitones)
    );

    setCurrentKey(targetKey);
    onContentChange(transposedContent, targetKey);
  }, [originalKey, content, transposeChord, onContentChange]);

  const transposeBySteps = (steps: number) => {
    const currentIndex = NOTES.indexOf(currentKey);
    if (currentIndex === -1) return;

    let newIndex = (currentIndex + steps) % 12;
    if (newIndex < 0) newIndex += 12;

    transposeContent(NOTES[newIndex]);
  };

  const resetToOriginal = () => {
    transposeContent(originalKey);
  };

  const getSemitoneDistance = () => {
    const originalIndex = NOTES.indexOf(originalKey);
    const currentIndex = NOTES.indexOf(currentKey);
    
    if (originalIndex === -1 || currentIndex === -1) return 0;
    
    let distance = currentIndex - originalIndex;
    if (distance > 6) distance -= 12;
    if (distance < -6) distance += 12;
    
    return distance;
  };

  const semitoneDistance = getSemitoneDistance();

  return (
    <Card className="bg-gradient-secondary shadow-musical border-l-4 border-l-primary">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Music className="w-5 h-5 text-primary" />
          <span>{t("transpose.title")}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Key Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t("transpose.currentKey")}
            </span>
            <Badge variant="outline" className="text-lg font-bold px-3 py-1 border-primary text-primary">
              {currentKey}
            </Badge>
          </div>
          
          {semitoneDistance !== 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {semitoneDistance > 0 ? `+${semitoneDistance}` : semitoneDistance} 
                {t("transpose.semitones")}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetToOriginal}
                className="text-xs hover:text-primary"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                {t("transpose.reset")}
              </Button>
            </div>
          )}
        </div>

        {/* Quick Transpose Buttons */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => transposeBySteps(-1)}
            className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-all ease-musical"
          >
            <ArrowDown className="w-4 h-4 mr-1" />
            -1
          </Button>
          
          <div className="px-4 py-2 bg-muted/50 rounded-md border-2 border-dashed border-muted-foreground/30">
            <span className="text-sm font-medium">
              {t("transpose.quickTranspose")}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => transposeBySteps(1)}
            className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-all ease-musical"
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            +1
          </Button>
        </div>

        {/* Key Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            {t("transpose.selectTargetKey")}
          </label>
          <Select value={currentKey} onValueChange={transposeContent}>
            <SelectTrigger className="bg-card border-muted-foreground/20 hover:border-primary transition-colors ease-musical">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NOTES.map((note) => (
                <SelectItem key={note} value={note} className="hover:bg-primary/10">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{note}</span>
                    {note === originalKey && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {t("transpose.original")}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
          <p>
            {t("transpose.originalKey")}
            <span className="font-bold text-musical-key">{originalKey}</span>
          </p>
          <p className="mt-1">
            {t("transpose.autoTranspose")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};