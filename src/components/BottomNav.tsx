import { useNavigate, useLocation } from 'react-router-dom';

export function BottomNav({
  onSave,
  saveDisabled,
  onPlusOverride,
}: {
  onSave?: () => void;
  saveDisabled?: boolean;
  onPlusOverride?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isShopping = location.pathname === '/shopping';
  const showSave = !!onSave;

  const handleCenterClick = () => {
    if (showSave) {
      onSave?.();
    } else if (onPlusOverride) {
      onPlusOverride();
    } else {
      navigate('/cocktail/new');
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around h-16 z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Bar */}
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
          isHome ? 'text-amber-500' : 'text-zinc-400'
        }`}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l6-4 6 4 6-4v14l-6 4-6-4-6 4V7z" />
        </svg>
        <span className="text-xs">Bar</span>
      </button>

      {/* Center button */}
      <button
        onClick={handleCenterClick}
        disabled={showSave && saveDisabled}
        className="flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 active:scale-95 transition-transform disabled:opacity-40 disabled:active:scale-100"
      >
        {showSave ? (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>

      {/* Shopping list */}
      <button
        onClick={() => navigate('/shopping')}
        className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
          isShopping ? 'text-amber-500' : 'text-zinc-400'
        }`}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="text-xs">Einkauf</span>
      </button>
    </nav>
  );
}
