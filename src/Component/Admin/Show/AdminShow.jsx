import React ,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { GetShow } from '../../../app/Slice/showSlice'

export default function AdminShow() {
    const dispatch=useDispatch()

    useEffect(()=>{
       dispatch(GetShow())
    },[]) 
  return (
    <div>
      
    </div>
  )
}
