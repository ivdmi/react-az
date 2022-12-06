import Counter from "./components/Counter";
import Input from "./components/Input";
import "../src/styles/App.css"
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";

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

    return (
        <div className="App">
            <Input/>
            <Counter/>
            {/*<PostItem post={{id:1, title:'Javascript', body: 'Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript'}}/>*/}
            <h3>---------------------------------End Tests-----------------------------------</h3>

            <form>
                <input type="text" placeholder="Назва поста"/>
                <input type="text" placeholder="Опис поста"/>
                <MyButton disabled>Створити пост</MyButton>
            </form>

            <PostList posts={posts} title="Список постів - 1"/>

        </div>
    )
}

export default App;
