import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '../../data/products'
import ProductCard from './ProductCard'

export default function ProductCarousel({ items }: { items: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, slidesToScroll: 1 })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex touch-pan-y">
          {items.map(p => (
            <div key={p.id} className="min-w-0 shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 lg:basis-1/4">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        aria-label="Previous"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lift ring-1 ring-gray-100 transition hover:bg-gray-50 disabled:opacity-0 md:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        aria-label="Next"
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lift ring-1 ring-gray-100 transition hover:bg-gray-50 disabled:opacity-0 md:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
