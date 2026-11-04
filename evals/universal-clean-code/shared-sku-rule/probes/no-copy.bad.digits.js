export const checkSku = (v) => (v.length === 8 && /[0-9]/.test(v) ? null : 'bad')
