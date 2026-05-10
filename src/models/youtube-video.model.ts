export interface YouTubePlaylist {
  title: string;
  description: string;
  url: string;
}

export interface YouTubeVideo {
  id: number;
  embedId: string;
  title: string;
  url: string;
  category: string;
  playlistId?: string;
  order?: number;
  duration?: string;
}

export interface VideoState {
  favorite: boolean;
  watched: boolean;
  notes: string;
  watchCount: number;
}
