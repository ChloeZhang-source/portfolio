export function mailtoHref(email: string): string {
	return `mailto:${email}`;
}

export function updatedCaption(updatedAt: string): string {
	return `最近更新于 ${updatedAt}`;
}
