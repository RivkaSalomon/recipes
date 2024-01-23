import axios from 'axios'
import { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as Actions from '../store/action';
import DisplayRecipe from './displayRecipe';

const GetRecipes = () => {

    const navig = useNavigate();

    const [recipes, setRecipes] = useState([])
    const [category, setCategory] = useState([])
    const [CurrentCategory, setCurrentCategory] = useState(0);
    const [Difficulty, setDifficulty] = useState([]);
    const [Level, setLevel] = useState(0);
    const [duration, setDuration] = useState(0);

    const dispatch = useDispatch();
    const nav = (x) => {
        navig("/displayRecipe", { state: x })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/recipe')
            .then(x => {

                console.log(x);
                setRecipes(x.data)
                dispatch({ type: Actions.SET_RECIPE, payload: x.data })
            })
            .catch(err => console.error(err))

    }, [])
    useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(x => {

                console.log(x);
                setCategory(x.data)
                dispatch({ type: Actions.SET_RECIPE, payload: x.data })
            })
            .catch(err => console.error(err))

    }, [])
    console.log("recipies", recipes);
    const selectkategory = (event) => {
        console.log(event)
        setCurrentCategory(event)
        console.log("----------------------", CurrentCategory)
    }
    const selectDifficulty = (event) => {
        console.log(event)
        setDifficulty(event)
        console.log("----------------------", CurrentCategory)
    }
    function selectDuration(event) {
        setDuration(event.target.value);
    }
    return (
        <div>
            <div class="select">
                <div class="s">
                    <select name="category" id="category" onChange={(e) => selectkategory(e.target.value)}>
                        <option value={0}>הכל</option>

                        {category.map(x => <option value={x.Id}>{x.Name}</option>)}

                    </select>
                    <label>בחר קטגוריה</label>
                </div>
                <input type="number" onChange={selectDuration}></input>
                <label >בחר זמן הכנה</label>
                <div class="s">
                    <select name="Difficulty" id="Difficulty" onChange={(e) => setLevel(e.target.value)}>
                        <option value={0}>Difficulty</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                    <label>בחר רמה</label>
                </div>



                <ul>{recipes.map(x =>
                    (((CurrentCategory == 0) || (CurrentCategory == x.CategoryId)) &&
                        (Level == 0 || Level == x.Difficulty) &&
                        (duration == 0 || duration >= x.Duration)) &&

                    <div>

                        <br />
                        <br />

                        <div><DisplayRecipe recipe={x} /></div>

                    </div>)}
                </ul>
                <Outlet />
                <hr />
            </div>
        </div>

    )
}
export default GetRecipes;