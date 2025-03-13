import './App.css';
import InputTodos from './components/input_Todo';
import ListTodos from './components/list_Todos';

function App() {
  return ( 
    <>
      <div className='container'> 
        <InputTodos /> 
        <ListTodos />
      </div>
    </>
  );
}

export default App;
