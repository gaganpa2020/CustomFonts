import { FONT } from './fontData';

const FONT_ROWS = 5;
const FONT_COLS = 5;
// Gap between consecutive letters (in pixel columns)
const LETTER_GAP = 1;
// Extra gap width for a space character (total pixel columns instead of the normal 5)
const SPACE_WIDTH = 3;

export function generateWordArt(text: string, fillWord: string): string {
  if (!fillWord) return '';

  const chars = text.toUpperCase().split('');
  const pad = ' '.repeat(fillWord.length);

  const rowBuffers: string[] = Array.from({ length: FONT_ROWS }, () => '');

  for (let ci = 0; ci < chars.length; ci++) {
    const ch = chars[ci];
    const isSpace = ch === ' ';

    if (isSpace) {
      // Render a narrower blank gap for word spacing
      for (let r = 0; r < FONT_ROWS; r++) {
        rowBuffers[r] += pad.repeat(SPACE_WIDTH);
      }
    } else {
      const pattern = FONT[ch] ?? FONT[' '];
      for (let r = 0; r < FONT_ROWS; r++) {
        for (let c = 0; c < FONT_COLS; c++) {
          rowBuffers[r] += pattern[r][c] ? fillWord : pad;
        }
      }
    }

    // Add inter-letter gap (not after last char)
    if (ci < chars.length - 1 && chars[ci + 1] !== ' ' && !isSpace) {
      for (let r = 0; r < FONT_ROWS; r++) {
        rowBuffers[r] += pad.repeat(LETTER_GAP);
      }
    }
  }

  return rowBuffers.join('\n');
}
