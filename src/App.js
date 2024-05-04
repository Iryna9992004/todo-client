import SignInPage from "./pages/sign-in-page/SignInPage";
import TodoPage from "./pages/todo-page/TodoPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />}/>
          <Route path="/login" element={<SignInPage/>}/>
          <Route path="/register" element={<SignUpPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
