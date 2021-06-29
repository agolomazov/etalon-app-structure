/**
 * Проверить является ли значение псевдонимом
 *
 * @param {any} val
 */
export const isAlias = (val) => typeof val === 'string' && val.startsWith('@');
