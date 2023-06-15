import axios from "../axios-config"
import { useState, useEffect } from "react"

import {Link} from "react-router-dom"
import "./Home.css"
import { toast } from "react-toastify"
const Home = () => {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const getMemories = async() =>{
            const res = await axios.get("/memories")

            setMemories(res.data)
        }

        getMemories()
    }, [])


    const  buttonExcluir = async(id) => {
        try{
            const res = await axios.delete(`/memories/${id}`);

            const updateMemories = memories.filter((memory) => memory._id !== id)

            setMemories(updateMemories);

            toast.success(res.data.msg)
        }catch(error){
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }
    return(
        <div className="home">
            <h2>Memorie Home</h2>
            {memories.length === 0 && (
                <h2>Nenhuma memória cadastrada!!</h2>
            )}
            <div className="memories-conteiner">    
                {memories.length > 0 &&(
                    memories.map((memory) => (
                        <div className="memory" key={memory._id}>
                            <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title}/>
                            <p>{memory.title}</p>
                            <div className="btn-division">
                                <Link to={`/memories/${memory._id}`}className="btn">Comentar</Link>
                                <button className="btn" onClick={() => {
                                    buttonExcluir(memory._id)
                                }}>Excluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Home