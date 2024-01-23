import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Fragment, useEffect, useState } from 'react';

import axios from 'axios';

const AddCategory = () => {
    const [category, setCategory] = useState([])

    const schema = yup.object({
        Name: yup.string().required(),

    }).required();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const getAllCategory = () => {

        axios.get('http://localhost:8080/api/category')
            .then(x => {

                console.log(x);
                setCategory(x.data)
            })
            .catch(err => console.error(err))

    }

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/api/category", data)
            .then(x => {
                console.log(x.data);
                getAllCategory();
            })
            .catch(err => console.log("jg"))
    }

    useEffect(() => {
        getAllCategory();

    }, [])

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>

                <lable>Name</lable>
                <br />
                <input {...register("Name")} />
                <p>{errors.Name?.message}</p>
                <input type="submit" />

            </form>
            <div>  {category.map((x, i) => <option key={i} value={x.Id}>{x.Name}</option>)}</div>

        </>
    )
}
export default AddCategory;