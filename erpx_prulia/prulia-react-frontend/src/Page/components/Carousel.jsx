import React, { Component } from 'react'
import Axios from 'axios'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
        import 'slick-carousel/slick/slick-theme.css';
        import MagicSliderDots from 'react-magic-slider-dots';
        import 'react-magic-slider-dots/dist/magic-dots.css';
export default class Caro extends Component {
  constructor(props){
    super(props)
    this.state={
      photosilder:[]
    }
  const telco = localStorage.getItem("telco");
 
    Axios.get(`/api/resource/PRULIA%20Telco/${telco}`,{
     
      headers:{

      }
      ,
      withCredentials: true,

  })
  
    .then(res=>{
      console.log(res.data.data.telco_photo_slider)
      this.setState({
        photosilder:res.data.data.telco_photo_slider
      })
    })
  }
     render() {
       const {photosilder}=this.state
  const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: (dots) => {
        return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={30} />
      }
    };

          return (
<Slider {...settings}>
    {photosilder.map(item=>(
      <div class="carousel-item">
      <img src={`http://167.99.77.197/${item.t_photo}`} alt="..."/>
    </div>
    ))}   
        </Slider>
          )
     }
}
