export interface Song {
  id: string;
  embedId: string;
  title: string;
  artist: string;
  source: string;
  moods: string[];
  url: string;
  category: string;
}

export interface SongState {
  favorite: boolean;
  listenCount: number;
  notes: string;
}
