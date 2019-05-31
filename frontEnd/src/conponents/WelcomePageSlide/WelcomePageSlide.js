import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import slide1 from '../../photo/slide1.jpg';
import slide2 from '../../photo/slide2.jpg';
import slide3 from '../../photo/slide3.jpg';
import './WelcomePageSlide.css'

const items = [
  {
    src: slide1,
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: slide2,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: slide3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const Slide = () => <UncontrolledCarousel className="wps_" items={items} />;

export default Slide;