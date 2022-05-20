import React from 'react'
import { useState } from 'react'
import { Carousel } from 'react-bootstrap'

function AppCarousel() {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval='10000' className='mx-5'>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={require(`../assets/images/carousel_1.png`)}
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={require(`../assets/images/carousel_2.png`)}
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={require(`../assets/images/carousel_3.png`)}
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default AppCarousel
