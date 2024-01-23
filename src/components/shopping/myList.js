import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./myList.css"

function MyList() {
    const user = useSelector((state) => state.user.user)


    const [listBuy, setListBuy] = useState([]);

    const getAllBuy = () => {
        axios.get(`http://localhost:8080/api/bay/${user.Id}`)
            .then(x => setListBuy(x.data))
    }
    useEffect(() => {
        getAllBuy();
    }, [])
    const plus = (x) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: user.Id, Count: 1 })
            .then(getAllBuy())
            .catch()
    }
    const minus = (x) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: user.Id, Count: -1 })
            .then(getAllBuy())
            .catch()
    }
    const deleteP = (x) => {
        axios.post(`http://localhost:8080/api/bay/delete/${x.Id}`)
            .then(getAllBuy())
            .catch()
    }
    return (<>

        {listBuy.map(x => <div id="container">
            <div className="items"> {x.Name} </div>
            <div className="items"> {x.Count} </div>
            <button onClick={() => plus(x)} className="items"> + </button>
            <button onClick={() => minus(x)} className="items"> - </button>
            <button onClick={() => deleteP(x)} className="items"> 🚮 </button>
        </div>
        )}


    </>
    );
}
export default MyList;