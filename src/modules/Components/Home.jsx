import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeSideber from './HomeSideber'
const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!data) {
      navigate("/login")
    }
  },[])

  return (
    <section>
      <div className='flex'>
        <HomeSideber/>
      </div>
    </section>
  )
}  

export default Home 