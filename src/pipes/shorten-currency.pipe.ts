import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortenCurrency',
    standalone: true
})
export class ShortenCurrencyPipe implements PipeTransform {
    transform(value: number, currencySymbol: string = '$'): string {
        if (value === null || value === undefined) return '';

        let newValue = value;
        let suffix = '';

        if (value >= 1_000_000_000) {
            newValue = value / 1_000_000_000;
            suffix = 'B';
        } else if (value >= 1_000_000) {
            newValue = value / 1_000_000;
            suffix = 'M';
        } else if (value >= 1_000) {
            newValue = value / 1_000;
            suffix = 'K';
        }

        // Keep 2 decimals max
        const formatted = newValue % 1 === 0 ? newValue.toFixed(0) : newValue.toFixed(2);

        return `${currencySymbol}${formatted}${suffix}`;
    }
}
