import Counter from "./components/Counter";
import Input from "./components/Input";
import "../src/styles/App.css"
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Мультипарадигменный язык программирования'},
        {id: 2, title: 'Java', body: 'Description'},
        {id: 3, title: 'C#', body: 'C# - Description'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);


    // useMemo пвиконує обчислення (сортування), запам"ятовує та кешує результат. Виконується коли змінюється масив залежностей
    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort], 'uk'))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post => post.title.toLowerCase().includes(filter.query.toLowerCase())))
    }, [filter.query, sortedPosts])


    // callback - функція необхідна для отримання параметра  newPost з нижнього компонента
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // Отримати post з дочернього компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <Input/>
            <Counter/>
            {/*<PostItem post={{id:1, title:'Javascript', body: 'Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript'}}/>*/}
            <h3>---------------------------------End Tests-----------------------------------</h3>

            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>


            <MyButton style={{margin: '10px 0 10px 0'}} onClick={()=>setModal(true)}>Створити користувача</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter}/>

           {/*? <PostList remove={removePost} posts={sortedPosts} title="Список постів - 1"/>*/}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів - 1"/>


        </div>
    )
}

export default App;
