import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-dd'): string {
    if (!value) {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);

    if (format === 'd MMM, yyyy') {
      const day = date.getDate(); // sin cero inicial
      const month = date.toLocaleString('es-ES', { month: 'short' }).replace('.', ''); // quitar punto si lo tiene
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    }

    const options: Intl.DateTimeFormatOptions = this.getFormatOptions(format);
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

  private getFormatOptions(format: string): Intl.DateTimeFormatOptions {
    switch (format) {
      case 'yyyy-MM-dd':
        return { year: 'numeric', month: '2-digit', day: '2-digit' };
      case 'dd/MM/yyyy':
        return { day: '2-digit', month: '2-digit', year: 'numeric' };
      case 'MMMM dd, yyyy':
        return { year: 'numeric', month: 'long', day: '2-digit' };
      case 'd MMM, yyyy':
        // Esta opción no se usa directamente, pero puede mantenerse como referencia
        return { day: 'numeric', month: 'short', year: 'numeric' };
      default:
        return { year: 'numeric', month: '2-digit', day: '2-digit' };
    }
  }
}

