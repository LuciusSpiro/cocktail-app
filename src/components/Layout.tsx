import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { useSaveAction } from '../hooks/useSaveAction';

export function AppLayout({ children }: { children: ReactNode }) {
  const { onSave, saveDisabled, onPlusOverride } = useSaveAction();

  return (
    <div className="flex flex-col min-h-[100svh]">
      <main className="flex-1 pb-20 overflow-y-auto">{children}</main>
      <BottomNav
        onSave={onSave ?? undefined}
        saveDisabled={saveDisabled}
        onPlusOverride={onPlusOverride ?? undefined}
      />
    </div>
  );
}
