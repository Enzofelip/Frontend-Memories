import { useState } from "react"
import axios from "../axios-config"
import "./AddMemory.css"
import { useNavigate } from "react-router-dom"

import {toast} from "react-toastify"

const AddMemory = () => {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", inputs.title);
        formData.append("description", inputs.description)

        try{
            const response = await axios.post("/memories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            toast.success(response.data.msg)
            navigate("/")
        }catch(err){
            console.log(err);
            toast.error(err.response.data.msg)
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'image'){
            setImage(e.target.files[0]);
        }else{
            setInputs({...inputs, [e.target.name]: e.target.value})
        }
    };

    return(
        <div>
            <div className="add-memory-page">
                <h2>Crie uma nova memória</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Titulo:</p>
                        <input type="text" placeholder="Digite o titulo" name="title" onChange={ handleChange }/>
                    </label>

                    <label>
                        <p>Descrição:</p>
                        <textarea name="description" placeholder="Explique o que aconteceu..." onChange={ handleChange }></textarea>
                    </label>

                    <label>
                        <p>Foto:</p>
                        <input type="file" name="image" onChange={ handleChange }/>
                    </label>
                    <input type="submit" value="Enviar" className="btn"></input>
                </form>
            </div>
           
        </div>
    )
}

export default AddMemory