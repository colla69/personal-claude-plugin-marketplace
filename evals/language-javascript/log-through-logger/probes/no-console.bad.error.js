export async function retry(fn, attempts) {
  try { await fn() } catch (e) { console.error(e) }
}
