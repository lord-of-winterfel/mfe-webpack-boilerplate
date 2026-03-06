/** Event names for cross-MFE communication (must match shell/other remotes). */
export const MFE_EVENTS = {
  NAVIGATE: 'luna-ui:navigate',
  THEME_CHANGE: 'luna-ui:theme-change',
  LIBRARY_ACTION: 'luna-ui:library:action',
  BLOG_ACTION: 'luna-ui:blog:action',
} as const;

export function emitMfeEvent(eventName: string, detail: unknown): void {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export function onMfeEvent<T = unknown>(
  eventName: string,
  handler: (e: CustomEvent<T>) => void
): () => void {
  const wrapped = (e: Event) => handler(e as CustomEvent<T>);
  window.addEventListener(eventName, wrapped);
  return () => window.removeEventListener(eventName, wrapped);
}
