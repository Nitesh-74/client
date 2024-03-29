import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTodoApi } from '../../services/api';


const AddTodoModal = ({setRefreshList}) => {
  const [todoDesc, setTodoDesc] = useState('');

  const handleToSubmit =async () => {
    console.log(todoDesc, "todoDesc");
    if(todoDesc===''){
    toast("todo is required")
    return;
    }
    const result = await createTodoApi({desc:todoDesc})
      console.log(result);
    if(result.status===200 && result.data.status===200){
        toast("todo added successfully")
        setRefreshList(new Date());
        setTodoDesc("");
    }
    else{
        toast(result.data.message)
    }
  };

  return (
    <div className="modal mt-5" id="exampleModal">
    <ToastContainer/>
      <div className="modal-dialog" role="document">
        <div className="modal-content"> {/* Corrected class name */}
          <div className="modal_header">
            <div className="modal-title">Add new Todo</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <span arial-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                name=""
                className="form-control"
                rows={3}
                onChange={(e) => {
                  setTodoDesc(e.target.value)
                }}
                placeholder="Enter todo"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer"> {/* Corrected class name */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleToSubmit}
            >
              Save Todo
            </button>
            <button
              type="button"
              className="btn btn-secondary"  onClick={()=>{setTodoDesc('')}}
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
