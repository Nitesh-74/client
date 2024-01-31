import React from 'react'
import moment from 'moment/moment'
import { MarkTodoApi, deleteTodoApi } from '../../services/api'
import { toast } from 'react-toastify'
const Todos = ({todo,setRefreshList}) => {

  const handleDelete = async () => {
    const result=await deleteTodoApi({
      todo_id:todo._id
    
    })
    console.log("dalete todo ",result);
    if(result.data.status===200){
    setRefreshList(new Date())
    toast('Deleted')
    }
    else
    toast("failed to delete .... try again")
  }

  const handleMarkTodo = async () => {
    const result=await MarkTodoApi({
      todo_id:todo._id
    })
    console.log("mark todo ",result);
    if(result.data.status===200){
    setRefreshList(new Date())
    toast(result.data.message)
    }
    else
    toast("failed to mark.... try again")
  }
  
  return (
   <div className="col-sm-3 mx-3 my-2 alert bg-light">
    <div className="card-header">
      {todo.isCompleted ? 'Complete' : 'Not Complete'}
    </div>
    <div className="card-body ">
      <h4 className='card-title'>{todo.desc}</h4>
       <p className='card-text'> {moment(todo.date).fromNow()}</p>
       
    </div>

    <div className="actionButtons" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div className="deleteButton">
          <button style={{background:'red',font:"whiite"}} onClick={handleDelete}> Delete</button>
        </div>
        <div className="markTodo">
          <button onClick={handleMarkTodo} style={{background:'lightgreen'}}> {todo.isCompleted?'Mark Uncompete' :'Mark Complete'} </button>
        </div>
       </div>
   </div>
  )
}

export default Todos