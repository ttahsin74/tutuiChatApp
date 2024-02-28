import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!data) {
      navigate("/login")
    }
  },[])

  return (
    <div>HomePage</div>
  )
}  

export default Home 