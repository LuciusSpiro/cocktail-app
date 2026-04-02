const ratingEmojis = ['😞', '😐', '🙂', '😄', '😍'];

export function RatingDisplay({ rating }: { rating: number }) {
  const emoji = ratingEmojis[Math.max(0, Math.min(4, rating - 1))] || '🙂';
  return <span className="text-2xl">{emoji}</span>;
}
