import React from 'react'

function Todo(){

    const [inputValue , setInputValue] = React.useState('');
    const [todos , setTodos] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [error,setError] = React.useState(false);
    const getTodo =() =>{
        setLoading(true);
        fetch(`http://localhost:3001/todos`)
        .then(response => response.json())
        .then((response) => {
            setTodos(response);
            })
        .catch((error) =>{
         setError(true);
         setTodos([]);
        })
        .finally(()=>{
            setLoading(false);
        })
    }
    React.useEffect(() => {
        getTodo();
    },[]);

    const addTodo = () =>{
        //Making a post request and saving the todo there ?
        const payload = {
            title :inputValue,
            status : false
        };
        fetch(`http://localhost:3001/todos`,{
            method : 'POST',
            body : JSON.stringify(payload),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then((response)=> response.json())
        .then((response)=>{
            getTodo();
        })
    }

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>Error... Something Went Wrong</h1>
    }

    return(
        <>
            <h1>Todo Application</h1>
            <input 
                placeholder='Add A New Todo'
                value={inputValue}
                onChange = {(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <br />

            {/* Render todo list here */}
                {todos.map((todo) => (
                    <div key={todo.id}>
                        {todo.title}
                    </div>
                ))}
        </>
    )

}

export default Todo;

