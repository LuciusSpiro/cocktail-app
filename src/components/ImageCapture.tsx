import { useState } from 'react';
import { useCamera } from '../hooks/useCamera';
import { PlaceholderPicker } from './PlaceholderPicker';
import { getPlaceholderComponent } from '../assets/placeholders';

export function ImageCapture({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (image: string | null) => void;
}) {
  const { captureImage } = useCamera();
  const [showPicker, setShowPicker] = useState(false);

  const handleCapture = async () => {
    const image = await captureImage();
    if (image) onChange(image);
  };

  const renderPreview = () => {
    if (!value) {
      return (
        <div className="flex flex-col items-center justify-center text-zinc-500">
          <span className="text-4xl mb-2">📷</span>
          <span className="text-sm">Bild hinzufügen</span>
        </div>
      );
    }
    if (value.startsWith('placeholder:')) {
      const key = value.replace('placeholder:', '');
      const Placeholder = getPlaceholderComponent(key);
      return <Placeholder className="w-24 h-24" />;
    }
    return <img src={value} alt="Cocktail" className="w-full h-full object-cover" />;
  };

  return (
    <div>
      <div className="w-32 h-32 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center mx-auto mb-3">
        {renderPreview()}
      </div>
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={handleCapture}
          className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm active:scale-95 transition-transform"
        >
          📷 Foto
        </button>
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm active:scale-95 transition-transform"
        >
          🍸 Platzhalter
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="px-4 py-2 bg-zinc-800 text-red-400 rounded-lg text-sm active:scale-95 transition-transform"
          >
            ✕
          </button>
        )}
      </div>
      {showPicker && (
        <PlaceholderPicker
          onSelect={(key) => {
            onChange(`placeholder:${key}`);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
