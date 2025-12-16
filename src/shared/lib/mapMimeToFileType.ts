type ContentFileType =
  | 'PDF'
  | 'IMAGE'
  | 'TEXT'
  | 'VIDEO'
  | 'AUDIO'
  | 'OTHER';

export const mapMimeToFileType = (mime: string): ContentFileType => {
  if (mime.startsWith('image/')) return 'IMAGE';
  if (mime.startsWith('video/')) return 'VIDEO';
  if (mime.startsWith('audio/')) return 'AUDIO';
  if (mime === 'application/pdf') return 'PDF';
  if (mime.startsWith('text/')) return 'TEXT';
  return 'OTHER';
}
