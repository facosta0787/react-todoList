import React from 'react';

function Taskform(props){
  const add = props.add
  const removeAll = props.removeAll
  return(
    <form id='addForm' style={{ margin: '10px auto' }} onSubmit={ add } className='form-inline'>
     <input type='text' id='task' className='form-control col-md-6 col-sm-5' style={{ marginRight: '2px' }} autoComplete='off'></input>
     <button type='submit' className='btn btn-primary' style={{ marginRight: '2px' }}>Add Task</button>
     <button type='button' className='btn btn-success' onClick={ removeAll }>Remove All</button>
    </form>
  )
}
 export default Taskform
