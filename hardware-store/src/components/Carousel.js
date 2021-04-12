import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselImages = ({ images }) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel style={{ width: '16.4rem' }} activeIndex={index} onSelect={handleSelect}>
            {images && images.map(image =>
                <Carousel.Item>
                    <img key={image.id}
                        height='230px'
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