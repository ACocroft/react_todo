import React, { useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'


export default function SingleToDo(props) {
    const { name, description} = props.todo
    const { currentUser } = useAuth()
    const [showEdit, setShowEdit] = useState(false);

    const deleteToDo = (id) => {
      if(window.confirm(`You're about to delete ${props.todo.name}?`)){
        axios.delete(`https://localhost:7284/api/ToDos/${id}`).then(() => props.getToDo())
      }
    }

  return (
    <div className='singleToDo col-md-5 m-4'>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id="editLink" onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button id="deleteLink" onClick={() => deleteToDo(props.todo.ToDoId)}>
            <FaTrashAlt />
          </button>
          {showEdit &&
            <ToDoEdit 
              todo={props.todo}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDos={props.getToDos}/>
          }
        </div>
      }
        <h3>{name}</h3>
        {description !== null ? 
            <p>{description}</p> : 
            <p>No description provided</p>
        }
    </div>
  )
}
