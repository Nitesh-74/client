import React from 'react'
import Header from './partials/Header'
import Todos from './partials/Todos'
import AddTodoModal from './partials/AddTodoModal'
import { useNavigate } from 'react-router-dom'
import { getTodoListApi, getToken } from '../services/api'
import { useEffect,useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {

  const navigation=useNavigate();
  const [list,setList]=useState([]);

  const [refreshList,setRefreshList]=useState([])

  useEffect(()=>{
  if(!getToken()){
  navigation('/login');
  }
  fetchTodoList();
  },[refreshList])

  async function fetchTodoList() {
    try {
      const result = await getTodoListApi();
      console.log("todolist", result);
  
      if (result.status === 200 && result.data.status === 200) {
        setList(result.data.data.todos.reverse());
      } else {
        // Handle error
        console.error("Error fetching todos:", result.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error fetching todos:", error.message);
    }
  }
  return (
    <div>
      <Header/>
       <div className="container">
       <ToastContainer/>
        <div className="row justify-content-md-center mt-4">
         {
          list.map(todo => <Todos todo={todo} key={todo._id} setRefreshList={setRefreshList} />)
         }
        </div>
       </div>
       <div className='' style={{position:"fixed" ,right:50,bottom:50, zIndex:1030 }}>
        <button type='button' 
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className='btn btn-outline-light'
        >
          ADD
        </button>
       </div>
  
      <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  )
}

export default Home
