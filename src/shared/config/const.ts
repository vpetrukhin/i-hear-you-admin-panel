export const FILE_UPLOADER_TYPES = {
  IMAGE: ['JPG', 'JPEG', 'PNG', 'GIF', 'SVG', 'WEBP'],
  VIDEO: ['MP4', 'WEBM', 'AVI', 'MOV'],
  AUDIO: ['MP3', 'WAV', 'OGG'],
  TEXT: ['TXT', 'MD'],
  PDF: ['PDF'],
} as const;

export const ALL_FILE_UPLOADER_TYPES = Object.values(FILE_UPLOADER_TYPES).flat();
