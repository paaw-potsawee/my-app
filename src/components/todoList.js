import React from "react";
import './todoList.css';

function Say(props) {
  const {todoList,removeTodo,finish,inputValue,edit,setEdit,isEditing} = props;
  let count = 0;
  return(
    <div>
        {todoList.map( (todo,i)=>{
          if(todo.text.includes(inputValue)){
            if(!!isEditing && todo.id === edit.id){
              return(
                <div key={todo.id}>{isEditing}</div>
              )
            }
            else{
              return(
                <div className="list" key={todo.id}>
                  <div onClick={() => finish(todo.id)} className={todo.isFinish}>{todo.text}</div>
                  <div className="btn">
                    <button  className="b edit-btn" onClick={() => setEdit(todo)}>EDIT</button>
                      <button onClick={() => {removeTodo(i)}} className="b det-btn">DELETE</button>
                  </div>
                </div>
              )
            }
          }else{
            count++;
            if(count === todoList.length) return "not found";
            return null;
          }
          
        })}
    </div>
    )

} 

export default Say;