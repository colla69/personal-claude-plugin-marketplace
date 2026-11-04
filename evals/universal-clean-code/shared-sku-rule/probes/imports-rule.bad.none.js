export function checkSku(v) { return /^[A-Z]{3}-\d{4}$/.test(v) ? null : 'bad' }
