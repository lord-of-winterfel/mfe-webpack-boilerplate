/**
 * Shared event names for cross-MFE communication via browser events.
 * Remotes can dispatch/listen to these for loose coupling.
 */
export const MFE_EVENTS = {
  NAVIGATE: 'luna-ui:navigate',
  THEME_CHANGE: 'luna-ui:theme-change',
  LIBRARY_ACTION: 'luna-ui:library:action',
  BLOG_ACTION: 'luna-ui:blog:action',
} as const;

export type MfeEventPayload = {
  [MFE_EVENTS.NAVIGATE]: { path: string };
  [MFE_EVENTS.THEME_CHANGE]: { mode: 'light' | 'dark' };
  [MFE_EVENTS.LIBRARY_ACTION]: { type: string; payload?: unknown };
  [MFE_EVENTS.BLOG_ACTION]: { type: string; payload?: unknown };
};

export function emitMfeEvent<K extends keyof typeof MFE_EVENTS>(
  eventName: K,
  detail: MfeEventPayload[(typeof MFE_EVENTS)[K]]
): void {
  window.dispatchEvent(new CustomEvent(MFE_EVENTS[eventName], { detail }));
}

export function onMfeEvent<K extends keyof typeof MFE_EVENTS>(
  eventName: K,
  handler: (e: CustomEvent<MfeEventPayload[(typeof MFE_EVENTS)[K]]>) => void
): () => void {
  const wrapped = (e: Event) => handler(e as CustomEvent<MfeEventPayload[(typeof MFE_EVENTS)[K]]>);
  window.addEventListener(MFE_EVENTS[eventName], wrapped);
  return () => window.removeEventListener(MFE_EVENTS[eventName], wrapped);
}
