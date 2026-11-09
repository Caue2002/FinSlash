// Usa a própria origem no Vercel; em arquivo local, defina a URL da API quando ela existir.
window.FINSLASH_API_BASE_URL = window.location.protocol === 'file:' ? '' : window.location.origin;
