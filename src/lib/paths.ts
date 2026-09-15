function envBase(): string {
	const env = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env;
	return env?.BASE_URL ?? '/';
}

function normalizeBase(baseUrl?: string): string {
	const raw = baseUrl ?? envBase();
	if (!raw || raw === '/') {
		return '/';
	}

	return raw.endsWith('/') ? raw : `${raw}/`;
}

export function withBase(path: string, baseUrl?: string): string {
	if (/^https?:\/\//i.test(path)) {
		return path;
	}

	const base = normalizeBase(baseUrl);
	if (path === '/' || path === '') {
		return base;
	}

	const suffix = path.startsWith('/') ? path.slice(1) : path;
	return `${base}${suffix}`;
}

export function stripBase(pathname: string, baseUrl?: string): string {
	const base = normalizeBase(baseUrl).replace(/\/$/, '');
	if (!base) {
		return pathname || '/';
	}

	if (pathname === base || pathname === `${base}/`) {
		return '/';
	}

	if (pathname.startsWith(`${base}/`)) {
		const rest = pathname.slice(base.length);
		return rest.length > 0 ? rest : '/';
	}

	return pathname || '/';
}
