'use client'
import { Button } from '@/src/shared/components/ui/button';
import { useQueryState } from 'nuqs';

export function FiltesrsSection() {
  // 'filter' es el nombre del parámetro en la URL
  const [filterParams, setFilterParmas] = useQueryState('filter', { defaultValue: 'all' });

  return (
    <div className="flex gap-2">
      {['todas', 'pendientes', 'entregadas', 'calificadas'].map((filter) => (
        <Button 
          key={filter}
          onClick={() => setFilterParmas(filter === 'all' ? null : filter)}
          className={`capitalize border ${filterParams !== filter && 'bg-white border-black text-black'}`}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}