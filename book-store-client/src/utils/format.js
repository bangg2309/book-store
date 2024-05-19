export function formatCurrency(value) {
    const formatter = new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(value);
}