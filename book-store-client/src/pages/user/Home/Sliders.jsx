import React, {useRef} from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ProductCard from '../../../components/ProductCard/ProductCard';
function Sliders({products}) {
  const productRef = useRef()
  const scroll = (scrollOffset) => {
      productRef.current.scrollLeft += scrollOffset;
  }
  return (
    <div className="container mx-auto relative rounded-md w-full h-full">
      
        <div style={{gridTemplateColumns: `repeat(${products.length},  310px)`}} ref={productRef} className={`relative mx-20  rounded-md grid mt-6 py-10 gap-6 scroll-smooth overflow-y-hidden overflow-x-hidden overflow-hidden `} >
          {products.map((product, index) => {
              return(
                
                <div key={index} className="relative min-h-full pb-5 rounded-md overflow-hidden origin-center-left hover:scale-110 hover:z-10 hover:shadow-md duration-300">
                  <div>
                  <ProductCard key={index} product={product} />
                  </div>
                </div>
              )
          })}
        </div>
        <button onClick={()=>scroll(-300)} className="absolute top-[43%] left-[65px] px-1 py-3 rounded-md opacity-70 z-20 bg-[#00000098] hover:bg-[#000000ce] hover:opacity-100 duration-300">
            <FaAngleLeft className="text-white text-[25px]"/>
          </button>
          <button onClick={()=>scroll(352)} className="absolute top-[43%] right-[65px] px-1 py-3 rounded-md opacity-70 z-20 bg-[#00000098] hover:bg-[#000000ce] hover:opacity-100 duration-300">
            <FaAngleRight className="text-white text-[25px]"/>
          </button>
          <div className="my-5">
            <button className="px-5 py-2 border-2 text-primary rounded-md border-yellow font-medium text-sm hover:bg-yellow active:bg-yellow-hover duration-300">See More</button>
          </div>
      </div>
  )
}

export default Sliders