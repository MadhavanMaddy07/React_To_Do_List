import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Additem = ({additems,handlesubmit,setAdditems}) => {
  return (
    <Form className='wrapper' onSubmit={(e)=>handlesubmit(e)}>
      <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
        <h2 className='text-center'>To Do List</h2>
        <Form.Control type="text" placeholder="Enter Task" onChange={(e)=> setAdditems(e.target.value)} value={additems} />
        <Button variant="primary" type="submit" className='mt-3'>
        Add Task
      </Button>
      </Form.Group>
      
    </Form>  )
}

export default Additem