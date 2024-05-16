import { Outlet } from 'react-router-dom'

import './stylesheets/App.css';

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
