import React, {useState} from "react";
import Logo from "../../assets/img/Bookworn.svg";
import {Badge} from "antd";
import {Link} from "react-router-dom";
import {
    FaSearch,
    FaUser,
    FaShoppingBag,
} from "react-icons/fa";
import SearchProduct from "./SearchProduct";
import * as productService from "../../apiService/productService";

function Headers() {
    const [search, setSearch] = useState("");
    const [isClose, setIsClose] = useState(true);
    const [noResult, setNoResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    let info = JSON.parse(localStorage.getItem('user'));

    const searchProduct = async () => {
        const response = await productService.searchProductByName(search);
        setSearchResult(response?.data);
    }
    const handleSearch = () => {
        if (search.length > 0) {
            searchProduct().then(r => {
                setNoResult(false);
                setIsClose(false)
            })
        } else {
            setSearchResult([]);
            setNoResult(true)
            setIsClose(true)
        }
    }
    const menus = [
        {value: `home`, label: `Home`},
        {value: `about`, label: `About`},
        {value: 'shop', label: `Shop`},
        {value: 'articles', label: `Articles`},
        {value: 'contact', label: `Contact`},
    ];

    return (
        <div className="sticky top-0 z-50 shadow-lg">
            <div className="w-100 " style={{background: "#1B3764"}}>
                <div className="p-10">
                    <div className="flex justify-between items-center relative">
                        <Link to="/" className="">
                            <img className="w-100" src={Logo} alt=""/>
                        </Link>
                        <div
                            className="bg-white  pl-2 px-1 py-2 rounded-md flex justify-center items-center basis-1/3 h-10">
                            <input className="w-[100%] pr-2 focus:outline-none" id="input" value={search} type="text"
                                   placeholder={`Search...`} onChange={(e) => setSearch(e.target.value)}/>
                            <button onClick={handleSearch}
                                    className="bg-yellow text-primary border-none w-[62px] h-[32px] rounded-md flex justify-center items-center hover:bg-yellow-hover duration-200 active:bg-yellow">
                                <FaSearch/>
                            </button>
                        </div>
                        <div className="absolute top-full left-[52%] translate-x-[-57%] w-[33.33%] translate-y-2">
                            <SearchProduct product={searchResult} close={isClose} setClose={setIsClose}/>
                        </div>


                        <div className="flex items-center">
                            {info === null ?
                                <Link to="/login"
                                      className="flex justify-center items-end text-white hover:text-yellow duration-500">
                                    <FaUser className="text-[25px]  inline-block "/>
                                    <p className=" ml-2 mr-10">Signin/Signup</p>
                                </Link>
                                :
                                <div className="relative group">
                                    <div className="flex justify-center items-end cursor-pointer  text-white ">
                                        {/* <FaUser className="text-[25px]  inline-block "/> */}
                                        <p className=" ml-2 mr-6">{info?.fullName}</p>

                                    </div>
                                    <p className="transition-all cursor-pointer group-hover:opacity-100 group-hover:top-full mt-[5px] opacity-0 z-[20] absolute top-[50%] left-[50%] translate-x-[-50%] min-w-max bg-[#0000007e] text-white font-medium rounded-[8px] text-sm px-3.5 py-2">
                    <span
                        className="absolute bottom-[99%] left-[50%] translate-x-[-50%] border-[7px] border-[transparent] border-b-[#0000007e]"/>
                                        Logout
                                    </p>
                                </div>

                            }

                            <Link to="/cart">
                                <Badge count={0}>
                                    <FaShoppingBag className="text-[25px] text-white hover:text-yellow duration-500"/>
                                </Badge>
                            </Link>
                            <div className="relative group ml-4">
                                <div className="flex justify-center items-end cursor-pointer  text-white ">
                                    <p className="ml-2 uppercase">EN</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white decoration-none shadow-sm flex basis-10/12 justify-center">
                {menus.map((menu, i) => (
                    <Link
                        to={`/${menu.value === 'home' ? '' : menu.value}`} key={i}
                    >
                        <p className="decoration-none my-3 mx-5 text-gray-500 hover:text-primary duration-300"
                           style={{fontSize: "20px"}}>
                            {menu.label}
                        </p>

                    </Link>
                ))}

            </div>
        </div>
    );
}

export default Headers;
