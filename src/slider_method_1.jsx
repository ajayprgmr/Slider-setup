import './App.css'
import { longList } from './data.js'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import { useState, useEffect, useCallback } from 'react'

function useSliderMethod1() {
  const [people, setPeople] = useState(longList)
  const [currentPerson, setCurrentPerson] = useState(0)

  const prevSlide = () => {
    setCurrentPerson(
      (oldPerson) => (oldPerson - 1 + people.length) % people.length
    )
  }

  const nextSlide = useCallback(() => {
    setCurrentPerson((oldPerson) => (oldPerson + 1) % people.length)
  }, [people.length])

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide()
    }, 2000)

    return () => {
      clearInterval(sliderId)
    }
  }, [currentPerson, nextSlide])

  return (
    <section className='silder-container'>
      <button onClick={prevSlide} className='arrow-left'>
        <FiChevronLeft />
      </button>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        return (
          <article
            className='slide'
            key={id}
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? 'visible' : 'hidden',
            }}
          >
            <img src={image} alt={`${name}-image`} className='person-image' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='quote' />
          </article>
        )
      })}
      <button onClick={nextSlide} className='arrow-right'>
        <FiChevronRight />
      </button>
    </section>
  )
}

export default useSliderMethod1
