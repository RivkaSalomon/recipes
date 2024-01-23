import './App.css';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Signin from './components/signin';
import Login from './components/login';
import AddRecipe from './components/recipes/addRecipe';
import DeleteRecipe from './components/recipes/deleteRecipe';
import GetRecipes from './components/recipes/getRecipes';
import AddCategory from './components/recipes/addCategory';
import MyList from './components/shopping/myList';

function App() {
  return (
    <div className="App">
      <header className="App-header"><Header ></Header>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
          <Route path="/deleteRecipe" element={<DeleteRecipe />} />
          <Route path="/getRecipes" element={<GetRecipes />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/myList" element={<MyList />} />


        </Routes></header>

    </div>
  );
}

export default App;
