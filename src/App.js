import './App.css';
import React, {useState , useEffect} from 'react';
import Say from './components/todoList';


function App() {
  const [text,setText] = useState('');
  const [inputValue,setInputValue] = useState('');
  const [edit,setEdit] = useState(null);
  const [todoList , setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if(savedTodoList){
      return JSON.parse(savedTodoList)
    }
    else{
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  },[todoList]);

 const onTextChange = ( {target : {value}}) =>{
  setText(value);
 };

 const addText = (e) => {

    e.preventDefault();
    if(text === '') return;
    setTodoList([{
      id: Date.now().toString(),
      text:text,
      isFinish:"false"
    },...todoList]);


    setText('');
 }


 const removeTodo = (index) => {
  let todo = [...todoList]
  todo.splice(index,1);
  setTodoList(todo);
 }

 const finish = (todoId) => {
  setTodoList(prev => 
    prev.map((todo) => {
      if(todo.id === todoId){
        if(todo.isFinish ==="false") return {...todo, isFinish: "true"};
        if(todo.isFinish === "true") return {...todo, isFinish: "false"};
      }
      return todo;
    })
  );
 }
 const onValueChange = (e) => {
  const {name , value} = e.target;
  setEdit((prev) => {
    return {
      ...prev, [name]: value
    }
  });
 }

 const submitEdit = (e) => {
  e.preventDefault();
  setTodoList((prev) => 
      prev.map((c) => {
        if(c.id !== edit.id) return c;
        return edit;
      })
    );
  setEdit(null);
  isEditing = null
 }

 let isEditing = null;
 if(!!edit){
  isEditing = (
    <div>
      <form onSubmit={submitEdit} className="list">
        <input 
          className="inputtext"
          type="text" 
          value={edit.text} 
          name="text"
          onChange={onValueChange}
        />
        <button type="submit" className="b submitchange">done</button>
      </form>
    </div>
  );
 }

  return (
    <div className="App">
      <h1>TO-DO LIST</h1>
      <form onSubmit={addText}>
        <div className='Add-task'>
            <input 
              type="text"  
              placeholder="your task"
              value={text} 
              onChange={onTextChange}
              className='maininput'
            />
            <button type="submit">ADD</button>
        </div>
      </form>
      <input 
        type="text" placeholder="search" 
        className="searchinput"
        onChange={e => setInputValue(e.target.value)} 
        value={inputValue} 
      />
      <div>
        <Say 
          todoList={todoList} 
          removeTodo={removeTodo} 
          finish={finish} 
          inputValue={inputValue}
          edit={edit}
          setEdit={setEdit}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
export default App;
