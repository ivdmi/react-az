import Counter from "./components/Counter";
import Input from "./components/Input";
import "../src/styles/App.css"
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import {useEffect, useMemo, useState} from "react";
// import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPageCount, usePagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
    const [posts, setPosts] = useState([
        // {id: 1, title: 'Javascript', body: 'Мультипарадигменный язык программирования'},
        // {id: 2, title: 'Java', body: 'Description'},
        // {id: 3, title: 'C#', body: 'C# - Description'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);    // кількість сторінок
    const [limit, setLimit] = useState(10); // кількість елементів на сторінку
    const [page, setPage] = useState(1);    //номер сторінки


    // let pagesArray = []
    // for (let i = 0; i < totalPages; i++) {
    //     pagesArray.push(i + 1);
    //     pagesArray.push(0);
    // }
    // console.log(pagesArray);
    // console.log(totalPages);


    // useMemo виконує обчислення (сортування), запам"ятовує та кешує результат. Виконується коли змінюється масив залежностей

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    // useMemo пвиконує обчислення (сортування), запам"ятовує та кешує результат. Виконується коли змінюється масив залежностей
    // const sortedPosts = useMemo(() => {
    //     if (filter.sort) {
    //         return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort], 'uk'))
    //     }
    //     return posts;
    // }, [filter.sort, posts])

    // const sortedAndSearchedPosts = useMemo(() => {
    //     return sortedPosts.filter((post => post.title.toLowerCase().includes(filter.query.toLowerCase())))
    // }, [filter.query, sortedPosts])

    // const [isPostsLoading, setIsPostsLoading] = useState(false);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];           // кількість постів
        setTotalPages(getPageCount(totalCount, limit));
    })

    // якщо залежності - пустий масив [] - useEffect спрацює лише один раз при монтуванні компонента
    useEffect(() => {
        fetchPosts();
    }, [page])

    // callback - функція необхідна для отримання параметра  newPost з нижнього компонента
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    //async function fetchPosts() {
    //setIsPostsLoading(true);
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // const posts = await PostService.getAll();
    // setPosts(posts);
    // setIsPostsLoading(false);
    //}

    // Отримати post з дочернього компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        //   fetchPosts();
    }

    return (
        <div className="App">
            <Input/>
            <Counter/>
            {/*<PostItem post={{id:1, title:'Javascript', body: 'Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript'}}/>*/}
            <h3>---------------------------------End Tests-----------------------------------</h3>

            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>

            <button onClick={fetchPosts}>Fetch</button>
            <MyButton style={{margin: '10px 0 10px 0'}} onClick={() => setModal(true)}>Створити користувача</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Виникла помилка ${postError}</h1>}

            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів - 1"/>
            }
            {/*? <PostList remove={removePost} posts={sortedPosts} title="Список постів - 1"/>*/}

            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>

        </div>
    )
}

export default App;
