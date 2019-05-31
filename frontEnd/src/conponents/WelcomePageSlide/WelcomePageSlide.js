import React, {Component} from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import slide1 from '../../photo/slide1.jpg';
import slide2 from '../../photo/slide2.jpg';
import slide3 from '../../photo/slide3.jpg';
import './WelcomePageSlide.css'
import {Spinner} from 'reactstrap'



class Slide extends Component {

        constructor(props)
        {
          super(props);
          this.state = {
            items: [
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
            ],
            slide1Ready: false,
            slide2Ready: false,
            slide3Ready: false
          }
        }

      componentDidMount(){
        var img1 = new Image();
        img1.src = slide1;
        img1.onload=()=>
        {
           this.setState({slide1Ready: true})
        }
        var img2 = new Image();
        img2.src = slide2;
        img2.onload=()=>{
            this.setState({slide2Ready: true})
        }
        var img3 = new Image();
        img3.src = slide3;
        img3.onload=()=>{
            this.setState({slide3Ready: true})
        }

      }

    
        
  
    


render(){
    if(this.state.slide1Ready&&this.state.slide2Ready&&this.state.slide3Ready)
    {
    return(   
      <UncontrolledCarousel className="wps_" items={this.state.items} />
    )
    }
    else
    {
      return(

        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }}/>
      )
    }
}

}
export default Slide;