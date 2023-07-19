import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { toDoSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`https://localhost:7284/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo){
            const toDoToCreate = values

            axios.post(`https://localhost:7284/api/ToDos`, toDoToCreate).then((response) => {
                props.setShowCreate(false)
                props.getToDos()
            })
        } else {
            const toDoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                description: values.description,
                categoryId: values.categoryId
            }
            axios.put(`https://localhost:7284/api/ToDos/${props.todo.toDoId}`, toDoToEdit).then((response) => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            description: props.todo ? props.todo.description : '',
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({ errors, touched }) => (
            <Form id='todoForm'>
                <div className="form-group m-3">
                    <Field name='name'className='form-control' placeholder='Name' />
                    {errors.name && touched.name && 
                        <div className="text-danger">{errors.name}</div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='description' as='textarea' className='form-control' placeholder='Description' 
                    style={{ resize: 'none', height: '5em' }} />
                    {errors.description && touched.description && 
                        <div className="text-danger">{errors.description}</div>
                    }
                </div>
                <div className="form-group m-3">
                    <Field name='categoryId' as='select' className='form-control'>
                        <option value='' disabled>
                            [--Please Choose--]
                        </option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-success m-3">
                        Submit ToDo to API
                    </button>
                </div>
            </Form>
        )}

    </Formik>
  )
}
