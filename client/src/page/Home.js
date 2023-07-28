import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from "../components/CardFeature";
import Products from "../components/Products";
import vegetables from "../assets/vegetables.jpg";
import fruits from "../assets/fruits-resized.jpg";
import eatables from "../assets/eatables-fastfood.jpg";
import scooter from "../assets/scooter.gif";
import Footer from "../components/Footer";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const images = useMemo(() => [vegetables, fruits, eatables], []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <div>
      <div className="p-2 md:p-4">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="flex gap-3 bg-white shadow-2xl w-36 px-2 items-center rounded-full">
              <p className="text-sm font-medium text-slate-900">
                Bike Delivery
              </p>
              <img src={scooter} className="h-7" alt="scooter"/>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold py-3">
              The Fastest Delivery to{" "}
              <span className="text-red-600 text-">Your Home</span>
            </h2>
            <p className="py-3 text-base ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </div>
          <div className="flex flex-col items-center md:w-1/2 w-full mt-3 md:mt-0">
            <div className="md:h-[24rem] h-[15rem] mb-4 w-full">
              <img
                src={images[currentImage]}
                alt="Slider"
                className="h-full w-full md:object-cover object-contain rounded-xl"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? "bg-black" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex w-full items-center">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">
              Fresh Vegetables
            </h2>
            <div className="ml-auto flex gap-4">
              <button
                onClick={preveProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
              >
                <GrPrevious />
              </button>
              <button
                onClick={nextProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
              >
                <GrNext />
              </button>
            </div>
          </div>
          <div
            className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
            ref={slideProductRef}
          >
            {homeProductCartListVegetables[0]
              ? homeProductCartListVegetables.map((el) => {
                  return (
                    <CardFeature
                      key={el._id + "vegetable"}
                      id={el._id}
                      name={el.name}
                      category={el.category}
                      price={el.price}
                      image={el.image}
                    />
                  );
                })
              : loadingArrayFeature.map((el, index) => (
                  <CardFeature
                    loading="Loading..."
                    key={index + "cartLoading"}
                  />
                ))}
          </div>
        </div>

        <div>
          <Products heading={"Products"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
