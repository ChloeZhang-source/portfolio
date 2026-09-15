import assert from 'node:assert/strict';
import { test } from 'node:test';

test('mailtoHref prefixes an email with mailto:', async () => {
	const { mailtoHref } = await import('./contact.ts');

	assert.equal(mailtoHref('hello@example.com'), 'mailto:hello@example.com');
});

test('updatedCaption uses the locked 最近更新于 prefix', async () => {
	const { updatedCaption } = await import('./contact.ts');

	assert.equal(updatedCaption('2026-09'), '最近更新于 2026-09');
});
