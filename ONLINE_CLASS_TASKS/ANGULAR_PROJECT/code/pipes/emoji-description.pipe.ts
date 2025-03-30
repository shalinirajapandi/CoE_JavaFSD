import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emojiDescription'
})
export class EmojiDescriptionPipe implements PipeTransform {
  transform(emoji: string): string {
    switch (emoji) {
      case '😠':
        return 'Angry';
      case '😕':
        return 'Confused';
      case '😐':
        return 'Neutral';
      case '😊':
        return 'Happy';
      case '😍':
        return 'Love';
      default:
        return 'Unknown';
    }
  }
}