import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import './Category.css'

const Category = () => {
  const [categories,setCategories] = useState([])
  const [categoryId,setCategoryId] = useState(0)
  const [defaultOption,setDefaultOption] = useState(true)

  useEffect(()=>{
    axios.get('https://rincy.pythonanywhere.com/api/v1/quizzes/categories/').then((response)=>{ 
      setCategories(response.data)
    }).catch(err=>{
      alert(err)
  })
  },[])

  return (
    <section id="category" className='wrapper'>
        <h1>Choose Category</h1>
        <div className='option-btns'>
          <button onClick={()=>setCategoryId(0)} className={defaultOption ?'active' : ""}>All</button>
          {categories.map((category)=>{
            return(
              <button key={category.id} onClick={()=>{setCategoryId(category.id);setDefaultOption(false)}}>{category.name}</button>
            )
          })}
        </div>

        <Link to={`/game/category/${categoryId}`} className='start-btn'>START<i className="fa-solid fa-arrow-right"></i></Link>
    </section>
  )
}

export default Category