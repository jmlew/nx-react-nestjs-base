// Interface for the default axios-cache-adapter memory store.
export declare interface MemoryStore {
  getItem: (key: string) => Promise<unknown>;
  setItem: (key: string, value: unknown) => Promise<unknown>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  length: () => Promise<number>;
}
