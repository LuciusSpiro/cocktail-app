import { useState } from 'react';
import { exportAll, importAll, type ExportData } from '../db';

export function Settings() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async () => {
    try {
      const data = await exportAll();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cocktail-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus({ type: 'success', text: `Export erfolgreich (${data.cocktails.length} Cocktails)` });
    } catch {
      setStatus({ type: 'error', text: 'Export fehlgeschlagen' });
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data: ExportData = JSON.parse(text);
        if (!data.cocktails || !data.customIngredients || !data.shoppingList) {
          setStatus({ type: 'error', text: 'Ungültiges Backup-Format' });
          return;
        }
        await importAll(data);
        setStatus({ type: 'success', text: `Import erfolgreich (${data.cocktails.length} Cocktails). App wird neu geladen...` });
        setTimeout(() => window.location.reload(), 1500);
      } catch {
        setStatus({ type: 'error', text: 'Import fehlgeschlagen - ungültige Datei' });
      }
    };
    input.click();
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold text-white mb-6">Einstellungen</h1>

      {/* Data section */}
      <div className="mb-8">
        <h2 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">Daten</h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-4 w-full p-4 bg-zinc-900 rounded-xl active:scale-[0.98] transition-transform text-left"
          >
            <span className="text-2xl">📤</span>
            <div>
              <span className="text-white font-medium block">Daten exportieren</span>
              <span className="text-zinc-500 text-xs">Cocktails, Zutaten & Einkaufsliste als Datei sichern</span>
            </div>
          </button>

          <button
            onClick={handleImport}
            className="flex items-center gap-4 w-full p-4 bg-zinc-900 rounded-xl active:scale-[0.98] transition-transform text-left"
          >
            <span className="text-2xl">📥</span>
            <div>
              <span className="text-white font-medium block">Daten importieren</span>
              <span className="text-zinc-500 text-xs">Backup-Datei laden (ersetzt alle aktuellen Daten)</span>
            </div>
          </button>
        </div>
      </div>

      {/* Status message */}
      {status && (
        <div
          className={`p-4 rounded-xl text-sm ${
            status.type === 'success'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {status.text}
        </div>
      )}
    </div>
  );
}
