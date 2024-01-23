import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState, useEffect } from "react";
import * as yup from "yup"
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { editRecipe } from "../service/recipe";
import { addRecipe } from "../service/recipe";




const schema = yup.object({

    Name: yup.string().required(),
    Instructions: yup.array().of(yup.string()).required(),
    Difficulty: yup.number().required(),
    Duration: yup.number().required(),
    Description: yup.string().required(),
    CategoryId: yup.number().required(),
    Img: yup.string().required(),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required(),
            Count: yup.number().required(),
            Type: yup.string().required()
        }).required())
})

function AddRecipe() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const selected_recipe = useSelector((state) => state.recipe.rSelected)
    let levels = ["קל", "בינוני", "קשה"]

    const user = useSelector((state) => state.user.user)
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/category")
            .then(x => setCategory(x.data))
    }, [])

    const { register, control, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) });
    const { errors } = formState;


    const { fields: Instructionsfields, append: appendInstructions, remove: removeInstructions
    } = useFieldArray({ control, name: "Instructions" });

    const { fields: Ingridentfields, append: appendIngrident, remove: removeIngrident
    } = useFieldArray({ control, name: "Ingrident" });

    const onSubmit = (data) => {
        if (selected_recipe) {
            dispatch(editRecipe(  {Id: selected_recipe.Id,
                Name: data.name, UserId: user.Id, CategoryId: data.category, Img: data.img, Duration: data.duration, Difficulty: data.level, Description: data.description,
                Ingrident: data.ingridient, Instructions: data.Instructions})).then(
            dispatch({ type: 'SET_SELECTED_RECIPE', data: null }))
        }
        else {
            console.log("rrrrrrrrrrrrrrrrrrecipe", data)
            dispatch(addRecipe({ ...data, UserId: user.Id }));
            alert("you added successfully")
        }

        navigate('../recipe')
    }
    return (
  
    
    <form onSubmit={handleSubmit(onSubmit)}>
    {console.log(selected_recipe)}
    <div class="mb"> שם מתכון</div>
    <input {...register("Name")} placeholder="שם מתכון" defaultValue={selected_recipe?.Name} type='text' />
    <p>{errors.Name?.message}</p>
    <div class="mb">מוצרים</div>
    <ul>
        {Ingridentfields.map((item, index) => {
            return (
                <li key={index}>
                    <div class="f">
                        <input placeholder="מוצר" id={item.id} defaultValue={selected_recipe?.Ingrident[index]?.Name}
                            {...register(`Ingrident.${index}.Name`, { required: true })}
                        />
                        <p>{errors.Ingrident?.message}</p>
                        <input placeholder="סוג" id={item.id} defaultValue={selected_recipe?.Ingrident[index]?.Type}
                            {...register(`Ingrident.${index}.Type`, { required: true })}
                        />
                        <p>{errors.Ingrident?.message}</p>
                        <input type="number" placeholder="כמות" id={item.id} defaultValue={selected_recipe?.Ingrident[index]?.Count}
                            {...register(`Ingrident.${index}.Count`, { required: true })}
                        />
                        <p>{errors.Ingrident?.message}</p>
                    </div>
                    <button type="button" onClick={() => removeIngrident(index)}>
                        מחק מוצר
                    </button>

                </li>
            );
        })}
    </ul>
    <section>
        <button
            type="button"
            onClick={() => {
                appendIngrident();
            }}
        >
            הוסף מוצר למתכון
        </button>
    </section>
    <div class="mb">הוראות הכנה</div>
    <ul>
        {Instructionsfields.map((item, index) => {
            return (
                <li key={index}>
                    <input type="text" placeholder="הוראה למתכון" defaultValue={selected_recipe?.Instructions[index]}
                        {...register(`Instructions.${index}`, { required: true })}
                    />
                    <p>{errors.Instructions?.message}</p>
                    <button type="button" onClick={() => removeInstructions(index)}>
                        מחק הוראה
                    </button>
                </li>);
        })}
    </ul>
    <section>
        <button
            type="button" onClick={() => { appendInstructions() }}>
            הוסף הוראה למתכון
        </button>
    </section>

    <div class="mb"> תיאור</div>
    <input {...register("Description")} placeholder="תיאור" defaultValue={selected_recipe?.Description} />
    <p>{errors.Description?.message}</p>

    <div class="mb"> זמן הכנה</div>
    <input type="number"{...register("Duration")} placeholder="זמן הכנה" name="Duration"defaultValue={selected_recipe ? selected_recipe.Duration : ''} />
    <p>{errors.Duration?.message}</p>

    <div class="mb">רמת קושי</div>
    <select name="Difficulty"defaultValue={selected_recipe ? selected_recipe?.Difficulty : 0} id="Difficulty" {...register("Difficulty")} >
        <option value="1"selected={selected_recipe &&selected_recipe.Difficulty=="1"}>קל</option>
        <option value="2"selected={selected_recipe &&selected_recipe.Difficulty=="2"}> בינוני</option>
        <option value="3"selected={selected_recipe &&selected_recipe.Difficulty=="3"}> קשה</option>
    </select>
    <p>{errors.Difficulty?.message}</p>
    <div class="mb"> קטגוריה</div>

    <div><select {...register("CategoryId")} name="CategoryId">
        {category.map(x => <option key={x.Id} value={x.Id} selected={selected_recipe && x.Id == selected_recipe.CategoryId}>
            {x.Name}
        </option>
        )}
    </select>
    </div>
    <p>{errors.CategoryId?.message}</p>

    <div class="mb"> תמונה</div>
    <input {...register("Img")} placeholder="ניתוב לתמונה" defaultValue={selected_recipe?.Img} />
    <p>{errors.Img?.message}</p>

    <input type="submit" />
</form>
    );
}
export default AddRecipe;




