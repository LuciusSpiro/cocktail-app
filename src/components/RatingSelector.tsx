const ratingEmojis = ['😞', '😐', '🙂', '😄', '😍'];

export function RatingSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {ratingEmojis.map((emoji, i) => {
        const rating = i + 1;
        const isSelected = rating === value;
        return (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`text-3xl p-2 rounded-lg transition-all ${
              isSelected
                ? 'bg-amber-500/20 scale-125'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}
