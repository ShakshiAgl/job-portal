import React, { useEffect, useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel'
import { Button } from './ui/button'

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "System Engineer",
  "Product Manager",
]

const CategoryCarousel = () => {
  const carouselRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = carouselRef.current?.querySelector('[data-carousel-next]')
      if (nextButton) nextButton.click()
    }, 2000) // scroll every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={carouselRef}>
      <Carousel className='w-full max-w-xl mx-auto my-10 relative'>
        <CarouselContent className="gap-3">
          {
            category.map((cat, index) => (
              <CarouselItem
                key={index}
                className='md:basis-1/2 lg:basis-1/3 '
              >
                <Button
                  variant="outline"
                  className='rounded-full bg-[#9eb4b1] w-full'
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious data-carousel-prev />
        <CarouselNext data-carousel-next />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
