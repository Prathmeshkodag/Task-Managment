import './App.css';
import { TaskProvider } from './Components/context/context';
import Dashboard from './Components/Dashboard/dashboard';
import Mainroute from './Router/router';

function App() {
  return (
    <div>
    <TaskProvider>
    <Mainroute/>
    </TaskProvider> 
    
    </div>
  );
}

export default App;
