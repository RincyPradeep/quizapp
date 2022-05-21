import React from 'react'

import './Loader.css'

import ClipLoader from "react-spinners/ClipLoader";


const Loader = () => {
  return (
    <section id="loader">
        <ClipLoader color="#000" size={50}/>
    </section>
  )
}

export default Loader