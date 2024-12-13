import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='lg:px-[80px] md:px-[60px] sm:px-[40px] px-[16px]'>
    <div >
        <img className='max-w-full h-auto ' src={assets.header_img} alt='hero'/>
    </div>
      
    </div>
  )
}

export default Hero
