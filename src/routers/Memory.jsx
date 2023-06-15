import axios from "../axios-config";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import "./Memory.css"

import {toast} from "react-toastify";
const Memory = () => {
    const [memory, setMemory] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const {id} = useParams();
    useEffect(() => {
        const getMemory = async() => {
            const res = await axios.get(`/memories/${id}`);

            setMemory(res.data);
            setComments(res.data.commentes)
        }
        getMemory();
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const comment = {name, text};
            const res = await axios.patch(`/memories/comment/${memory._id}`, comment)

            const lastComment = res.data.memory.commentes.pop()
            console.log(res.data)
            setComments((comments) => [...comments, lastComment])

            setName("");
            setText("");

            toast.success(res.data.msg)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    if(!memory) return <p>CArregando...</p>;
    return(
        <div className="memory-page">
            <div className="memory-image">
                <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title}/>
            </div>
          <h2>{memory.title}</h2>
          <p>{memory.description}</p>
            <div className="comment-form">
                <h3>Envie o seu comentário</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" placeholder="Seu nome" onChange={(e) => setName(e.target.value)} value={name}/>
                    </label>

                    <label>
                        <textarea placeholder="Seu comentário" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                    </label>

                    <input type="submit" value="Enviar" className="btn"/>
                </form>
            </div>
            <div className="commentes-conteiner">
                <h3>Comentário ({comments.length})</h3>
                {comments.length === 0 && <p>Não há comentáros...</p>}
                {comments.length > 0 && (
                    comments.map((comment) => (
                        <div className="comment" key={comment._id}>
                            <p className="comment-name">{comment.name}</p>
                            <p className="comment-text">{comment.text}</p>

                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Memory