import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselImages = ({ images, height, width }) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel style={{ width: `${width}` }} activeIndex={index} onSelect={handleSelect}>
            {images && images.map(image =>
                <Carousel.Item>
                    <img key={image.id}
                        height={height}
                        className="d-block w-100"
                        src={image.url}
                        alt="Error, sorry..."
                    />
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default CarouselImages;