import React, { useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'


export default function SingleToDo(props) {
    const { currentUser } = useAuth()
    const [showEdit, setShowEdit] = useState(false);

    const deleteToDo = (id) => {
      if(window.confirm(`You're about to delete ${props.todo.name}?`)){
        axios.delete(`https://localhost:7284/api/ToDos/${id}`).then(() => props.getToDos())
      }
    }

    return (
      <tr>
          <td>
              <input className='checkbox' type='checkbox' checked={props.todo.done} />
          </td>
          <td>{props.todo.name}</td>
          <td>{props.todo.category.catName}</td>
          {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <td className='text-center'>
                <button className="fs-5 rounded" id='editLink' onClick={() => setShowEdit(true)}>
                    <FaEdit />
                </button>
                &emsp;
                <button className='fs-5 rounded' id='deleteLink' onClick={() => deleteToDo(props.todo.toDoId)}>
                    <FaTrashAlt />
                </button>
                {showEdit &&
                  <ToDoEdit
                    todo={props.todo}
                    getToDos={props.getToDos}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit} 
                  />
                }
            </td>
          }
          
      </tr>
    )
}
