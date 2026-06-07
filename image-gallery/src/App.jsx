import React, { useEffect, useState } from 'react'
import 'animate.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css'

const API_KEY = "kPNnZGjibXa6t5B2ayE0Gvs2Z38l9tzQPxTNkQq4e8Iwzwz1k1YtpzuF";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("people");

  const fetchImage = async () => {
    try {
      setLoading(true)
      const options = {
        headers: {
          Authorization: API_KEY
        }
      }
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, options);
      console.log(res.data.photos)
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...res.data.photos
      ]);
            
    }
    catch (err) {
      toast.error("Failed to fetch images");
    }
    finally{
      setLoading(false)
    }

  }

  const loadMore = ()=>{
     setPage(page+1)
  }

  const search = (e)=>{
    e.preventDefault()
    const q = e.target[0].value.trim();

    setPhotos([]);
    setPage(1);
    setQuery(q);

  }

  useEffect(() => {
    fetchImage()
  }, [page, query]);

  return (
    <>
      <div className='bg-gray-100 min-h-screen flex flex-col items-center p-8 gap-12 animate__animated animate__fadeIn'>
        <h1 className='text-4xl font-bold  text-indigo-600'>
          📷 Image Gallery {page} </h1>

        <form onSubmit={search}>
          <input
            className='p-3 bg-white rounded-l-lg w-100 focus:outline-indigo-500'
            placeholder='Search image here'
            required
          />
          <button className='bg-linear-to-br from-indio-600 via-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-r-lg hover:scale-105 transition-transform duration-500'>Search</button>
        </form>

        {
          photos.length === 0 && 
          <p className='text-lg text-gray-900 text-center mt-2'>Search result not found!</p>
        }

        <div className='grid lg:grid-cols-4 lg:gap-10 gap-8 w-10/12'>
          {
            photos.map((item, index) => (
              <div key={index} className='bg-white rounded-lg shadow-lg p-2'>
                <img
                  src={item.src.medium}
                  alt={item.alt}
                  className='rounded-t-lg h-45 object-cover w-full hover:scale-110 transition-transform duration-300'
                 />
                <div>
                  <h1 className='text-black/80 text-xl font-medium capitalize mt-2'>{item.photographer}</h1>
                  <a href={item.src.original} target='_blank' className='mt-3 block bg-green-400 font-bold py-2 rounded-lg text-center hover:scale-105 transition-transform duration-300'>
                    <i className="ri-arrow-down-line mr-1"></i>                    
                    Downlaod
                  </a>
                </div>
              </div>
            ))
          }
        </div>
        
        {
          loading &&
          <i className="ri-loader-line text-4xl text-gray-400 animate-spin"></i>
        }

        {
          photos.length > 0 &&
          <div>
            <button onClick={loadMore} className='bg-rose-500 py-3 px-16 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-300'>Load more </button>
          </div>
        }

        <ToastContainer />
      </div>
    </>


  )
}

export default App