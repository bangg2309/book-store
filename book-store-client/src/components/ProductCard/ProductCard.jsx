import React, { useState} from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
function ProductCard({product}) {
  const [active, setActive] = useState(false);
  const handleActive = () => {  
    setActive(true)
  }
  return (
    <div className="w-[310px] h-[435px] mb-5">
      <div className="bg-[#F5F8FC] rounded-[5px] py-10 flex items-center justify-center">
        <div className="relative shadow-xl shadow-[#777775]  rounded-[5px] overflow-hidden">
            <div
              style={{ backgroundImage: `url(${product.image})` }}
              className="rounded-[5px] min-h-[280px] min-w-[219px] bg-cover bg-center"
            ></div>
            <Link>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center rounded-md items-start  bg-[#00000065] opacity-0 hover:opacity-100 duration-500" onMouseEnter={handleActive} onMouseLeave={() => setActive(false)}>
                <button className={`py-2 px-5 m-auto text-primary rounded-sm text-md font-medium bg-yellow hover:bg-yellow-hover active:bg-yellow active:duration-300 ${ active ? 'translate-y-3 duration-700': '-translate-y-4 duration-700'}` }>Add to cart</button>
            </div>
            </Link>
          </div>
        </div>
        <Link to={`/product/${product.id}`} >
          <h1 className="text-[22px] font-light font-serif px-3 truncate">{product.name}</h1>
          <p className="text-[#777777] ">{product.author.name}</p>
          <span className="line-through text-[#777777] font-semibold font-serif mr-2">$100.00</span>
          <span className="text-primary font-semibold font-serif">{formatCurrency(product.price)}</span>
        </Link>
    </div>
  );
}

export default ProductCard;
