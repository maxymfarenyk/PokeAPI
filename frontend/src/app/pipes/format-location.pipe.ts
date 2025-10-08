import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatLocation' })
export class FormatLocationPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return 'Unknown Location';

    return value
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
