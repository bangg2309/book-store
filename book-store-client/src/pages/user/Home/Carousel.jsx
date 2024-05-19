import React from 'react'
import { Carousel } from 'antd';
import  Banner1 from '../../../assets/img/banner1.jpg'
import  Banner2 from '../../../assets/img/banner2.jpg'
import  Banner3 from '../../../assets/img/banner3.jpg'
function Carousels() {
    const banner = [
        {url: Banner1},
        {url: Banner2},
        {url: Banner3}
    ]
  return (
    <div>
    <Carousel autoplay>
    {banner.map((item, index) => (
        <div key={index} className='overflow-hidden w-screen h-[35%]'>
            <img className='w-full h-[630px]' src={item.url} alt="" />
        </div>
    ))}
    </Carousel>
    </div>
  )
}

export default Carousels