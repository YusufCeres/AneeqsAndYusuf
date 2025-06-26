"use client";

import React, { useEffect, useRef, useState } from "react";
import "./gallery.css";

const images = [
  { src: "/20221217_164939.jpg", alt: "Burger Queen", label: "Burger Queen" },
  { src: "/20220716_171700.jpg", alt: "Movie Dates", label: "Movie Dates" },
  { src: "/20221217_164939.jpg", alt: "Parent Practice", label: "Parent Practice" },
  { src: "/IMG-20210327-WA0054.jpg", alt: "Sea Lovers", label: "Sea Lovers" },
  { src: "/WhatsApp Image 2024-05-11 at 20.22.41_a13c6d9d.jpg", alt: "Bunch of Monkeys", label: "Bunch of Monkeys" },
  { src: "/IMG-20220716-WA0005.jpg", alt: "Forever Date", label: "Forever Date" },
  { src: "/20211126_180207.jpg", alt: "House visits", label: "House visits" },
  { src: "/20211124_133545.jpg", alt: "Hand in Hand", label: "Hand in Hand" },
];

export default function Gallery() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalSlides = images.length;

  const updateSlide = (index: number) => {
    setCurrentSlideIndex(index);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const nextSlide = () => {
    const newIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlide(newIndex);
  };

  const goToSlide = (index: number) => {
    updateSlide(index);
  };

  const startAutoPlay = () => {
    if (autoPlay && !autoPlayIntervalRef.current) {
      autoPlayIntervalRef.current = setInterval(nextSlide, 4000);
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const handleMouseEnter = () => {
      stopAutoPlay();
    };

    const handleMouseLeave = () => {
      startAutoPlay();
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("mouseenter", handleMouseEnter);
      carousel.addEventListener("mouseleave", handleMouseLeave);
      carousel.addEventListener("touchstart", handleTouchStart);
      carousel.addEventListener("touchend", handleTouchEnd);
    }

    // Start auto-play
    startAutoPlay();

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (carousel) {
        carousel.removeEventListener("mouseenter", handleMouseEnter);
        carousel.removeEventListener("mouseleave", handleMouseLeave);
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchend", handleTouchEnd);
      }
      stopAutoPlay();
    };
  }, [currentSlideIndex, autoPlay]);

  return (
    <div className="gallery-page">
      <div className="carousel-container">
        <div className="carousel" ref={carouselRef}>
          <div className="carousel-track" ref={trackRef}>
            {images.map((img, i) => (
              <div className="carousel-slide" key={i}>
                <img src={img.src} alt={img.alt} />
                <div className="carousel-overlay">
                  <span>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-nav carousel-nav--prev" onClick={prevSlide}>
            &lsaquo;
          </button>
          <button className="carousel-nav carousel-nav--next" onClick={nextSlide}>
            &rsaquo;
          </button>
          <div className="carousel-counter">
            <span>{currentSlideIndex + 1}</span> / <span>{totalSlides}</span>
          </div>
        </div>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlideIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
