import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilterCat(props) {
    const [categories, setCategories] = useState([])

    //uef
    useEffect(() => {
        axios.get(`https://localhost:7284/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, []);

  return (
    <div className='text-center mt-5'>
        <button className='btn btn-primary bg-dark m-1' onClick={() => props.setFilter(0)}>
            All
        </button>
        {categories.map( c => 
            <button key={c.categoryId} className='btn btn-primary bg-dark m-1' 
            onClick={() => props.setFilter(c.categoryId)}>
                {c.catName}
            </button>
        )}

        {!props.showDone ?
            <button className="btn btn-success m-1" onClick={() => props.setShowDone(!props.showDone)}>
                Show Done
            </button> :
            <button className="btn btn-warning m-1" onClick={() => props.setShowDone(!props.showDone)}>
                Hide Done
            </button>        
        }
    </div>
  )
}