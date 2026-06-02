import "../../../styles/styles.css";
import "./Carrousel.css";

import React, { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    url: "https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/BensonBoone_1440x450_2026.jpg?width=1440&height=450&fit=bounds&optimize=high&auto=webp",
    title: "Evento 1",
  },
  {
    id: 2,
    url: "https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp",
    title: "Evento 2",
  },
  {
    id: 3,
    url: "https://s1.ticketm.net/dam/a/057/3dc88133-61df-47f6-9665-f3a83a4dd057_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp",
    title: "Evento 3",
  },
  {
    id: 4,
    url: "https://s1.ticketm.net/dam/a/433/021fc7b3-815d-4f88-9fce-83b31a96d433_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp",
    title: "Evento 4",
  },
];

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousClick = () => {
    setCurrentImageIndex(
      currentImageIndex === 0
        ? images.length - 1
        : currentImageIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) % images.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextClick();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <section className="carousel-section">
      <div className="image-container">
        <button
          className="nav-button left"
          onClick={handlePreviousClick}
        >
          &lt;
        </button>

        {images.map((image, index) => (
          <div
            key={image.id}
            className={
              currentImageIndex === index
                ? "slide active"
                : "slide"
            }
          >
            <img
              src={image.url}
              alt={image.title}
            />

            <div className="overlay">
              <h1>{image.title}</h1>

              <button className="ticket-button">
                Encontrar Tickets
              </button>
            </div>
          </div>
        ))}

        <button
          className="nav-button right"
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default ImageCarousel;