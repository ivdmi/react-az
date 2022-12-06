import Counter from "./components/Counter";
import Input from "./components/Input";
import "../src/styles/App.css"
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Javascript',
            body: 'Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript'
        },
        {id: 2, title: 'Java', body: 'Description'},
        {id: 3, title: 'C#', body: 'C# - Description'},
    ])

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const addNewPost = (e) => {
        e.preventDefault()      // відключити Submit - не оновлювати сторінку коли тиснемо на кнопку
        console.log(title)      // дані з управляемого інпута
        console.log(body)      // дані з управляемого інпута
    }

    return (
        <div className="App">
            <Input/>
            <Counter/>
            {/*<PostItem post={{id:1, title:'Javascript', body: 'Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript'}}/>*/}
            <h3>---------------------------------End Tests-----------------------------------</h3>

            <form>
                {/* Управляемий компонент */}
                <MyInput type="text"
                         value={title}
                         onChange={e => setTitle(e.target.value)}
                         placeholder="Назва поста"/>

                {/* управляемий компонент */}
                <MyInput
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    type="text" placeholder="Опис поста"
                />
                <MyButton onClick={addNewPost}>Створити пост</MyButton>
            </form>

            <PostList posts={posts} title="Список постів - 1"/>

        </div>
    )
}

export default App;
