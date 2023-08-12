'use client'
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Weather from './components/Weather';

export default function Home() {

  const [city, setCity] = useState('');
  const [weather, setWeather] =useState({});
  const [loading, setLoading] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data)
    } )
    setCity(' ')
    setLoading(false)
  }

  return (
    <div>
      {/* overlay div */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[1]'/>

      {/* background image */}
      <Image
      src='https://images.unsplash.com/photo-1553984840-ec965a23cddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'
      alt='Image'
      layout='fill'
      className='object-cover'
      />

      {/* search */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
        <form onSubmit={fetchWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
          <div>
            <input onChange={(e) => {setCity(e.target.value)}}  className='bg-transparent border-none text-white focus:outline-none' type="text" placeholder='Search city'/>
          </div>
          <button onClick={fetchWeather}> <BsSearch/> </button>
        </form>
      </div>

      {/* weather */}
      {weather.main && <Weather data={weather}/>}
    </div>
  )
}
