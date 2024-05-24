import { useState } from 'react'

const TodoForm = ({addTodo}) => {

    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || !category) return;
        addTodo(value,category);
        setValue("");
        setCategory("");




        console.log(value, category)
    };


    return (
        <div className='todo-form'>
            <h2>Criar tarefas</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Digite o titulo'
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Trabalho">Selecione uma categoria</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                    <option value="Trabalho">Trabalho</option>

                </select>
                <button className='tarefa'  type='submit'>Criar tarefa</button>
            </form>


        </div>


    )
};

export default TodoForm;

