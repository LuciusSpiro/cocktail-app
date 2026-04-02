import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { createElement } from 'react';

interface SaveActionContextType {
  onSave: (() => void) | null;
  saveDisabled: boolean;
  onPlusOverride: (() => void) | null;
  registerSave: (handler: () => void, disabled?: boolean) => void;
  clearSave: () => void;
  registerPlusOverride: (handler: () => void) => void;
  clearPlusOverride: () => void;
}

const SaveActionContext = createContext<SaveActionContextType | null>(null);

export function SaveActionProvider({ children }: { children: ReactNode }) {
  const [onSave, setOnSave] = useState<(() => void) | null>(null);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [onPlusOverride, setOnPlusOverride] = useState<(() => void) | null>(null);

  const registerSave = useCallback((handler: () => void, disabled = false) => {
    setOnSave(() => handler);
    setSaveDisabled(disabled);
  }, []);

  const clearSave = useCallback(() => {
    setOnSave(null);
    setSaveDisabled(false);
  }, []);

  const registerPlusOverride = useCallback((handler: () => void) => {
    setOnPlusOverride(() => handler);
  }, []);

  const clearPlusOverride = useCallback(() => {
    setOnPlusOverride(null);
  }, []);

  return createElement(
    SaveActionContext.Provider,
    { value: { onSave, saveDisabled, onPlusOverride, registerSave, clearSave, registerPlusOverride, clearPlusOverride } },
    children
  );
}

export function useSaveAction() {
  const ctx = useContext(SaveActionContext);
  if (!ctx) throw new Error('useSaveAction must be used within SaveActionProvider');
  return ctx;
}
