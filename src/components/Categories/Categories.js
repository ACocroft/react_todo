import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory';
import '../Categories/Categories.css'

import { useAuth,  } from '../../Contexts/AuthContext';
import CatCreate from './CatCreate';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const { currentUser } = useAuth()
    const [showCreate, setShowCreate] = useState(false)


    const getCategories = () => {
        axios.get(`https://localhost:7284/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    

  return (
    <section className="categories">
        <article className=" p-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>

        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                {showCreate ?
                    <>
                      <button onClick={() => setShowCreate(false)} className="btn btn-warning">Cancel</button>
                      <CatCreate setShowCreate={setShowCreate} getCategories={getCategories}/>
                    </> 
                    : <button onClick={() => setShowCreate(true)} className="btn btn-default">Create Category</button>
                }
            </div>
        }
        
        <Container className='p-2'>
            <table className="table bg-info table-dark my-3">
                <thead className="table-secondary text-uppercase">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && 
                            <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c =>
                      <SingleCategory key={c.categoryId} category={c} getCategories={getCategories}/>    
                    )}
                </tbody>
            </table>
        </Container>

    </section>
  )
}
