import assert from 'node:assert/strict';
import {detectPromotion, detectUnsafeContent, mentionText, normalizeAntiPromo} from './anti-promo.mjs';

assert.equal(detectPromotion('Halo semuanya').detected, false);
assert.equal(detectPromotion('Promo terbaru https://bit.ly/contoh').detected, true);
assert.equal(detectPromotion('mau jual barang').reasons.includes('kata:jual'), true);
assert.equal(detectPromotion('Promo', {enabled: false, words: []}).detected, false);
assert.equal(mentionText('628123456789@s.whatsapp.net'), '@628123456789');
assert.equal(normalizeAntiPromo({words: [' PROMO ', 'promo'], whitelist: ['628123456789@s.whatsapp.net']}).words.length, 1);
assert.deepEqual(normalizeAntiPromo({whitelist: ['628123456789@s.whatsapp.net', '628123456789@s.whatsapp.net']}).whitelist, ['628123456789@s.whatsapp.net']);
assert.deepEqual(normalizeAntiPromo({whitelist: ['123456789@lid']}).whitelist, ['123456789@lid']);
assert.equal(detectUnsafeContent('kunjungi https://contoh.test', {obsceneEnabled: true}).detected, true);
assert.equal(detectUnsafeContent('pesan biasa', {obsceneEnabled: true, obsceneWords: ['kasar']}).detected, false);
assert.equal(detectUnsafeContent('kata kasar', {obsceneEnabled: true, obsceneWords: ['kasar']}).detected, true);

console.log('Anti-promo tests passed');
