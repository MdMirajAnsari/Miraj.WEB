export interface RepoMovie {
  id: string;
  filename: string;
  title: string;
  extension: string;
  size?: number;
  sizeFormatted?: string;
  modified?: string;
  streamUrl: string;
  isLocalFile?: boolean;
  thumbnailUrl?: string;
}
