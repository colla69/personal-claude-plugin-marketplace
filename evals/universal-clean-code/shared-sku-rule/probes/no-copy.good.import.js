import { isValidSku } from '../server/validate.js'
export const checkSku = (v) => (isValidSku(v) ? null : `${v} is not a valid SKU`)
