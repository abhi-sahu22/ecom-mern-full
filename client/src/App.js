import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlice';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      // console.log(resData);
      dispatch(setDataProduct(resData))
    })()
  }, [dispatch])
  console.log(productData);
  return (
    <>
    <Toaster />
    <div>
      <Header />
      <main className="pt-16 bg-amber-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default App
