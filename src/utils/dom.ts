export const $ = (selector: string, context: HTMLElement | Document = document) => context.querySelector(selector);
export const $$ = (selector: string, context: HTMLElement | Document = document) => Array.from(context.querySelectorAll(selector)); 