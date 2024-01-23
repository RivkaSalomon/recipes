import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const schema = yup.object({
        Username: yup.string().required(),
        Password: yup.string().required().min(4),

    }).required();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        console.log("asdfghjkl;")
        console.log(data)

        axios.post("http://localhost:8080/api/user/login", data)
            .then(x => {
                console.log(x.data);
                dispatch({ type: "SET_USER", data: x.data })
                navigate('/homePage');

            })
            .catch(err => navigate('/Signin'))
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <lable>userName</lable>
            <br />
            <input {...register("Username")} />
            <p>{errors.Username?.message}</p>

            <lable>password</lable>
            <br />
            <input {...register("Password")} />
            <p>{errors.Password?.message}</p>
            <input type="submit" />

        </form>

    );
}
export default Login;