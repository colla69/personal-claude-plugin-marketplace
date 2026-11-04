export const checkSku = (v) => (/^[A-Z]{3}-\d{4}$/.test(v) ? null : 'bad')
