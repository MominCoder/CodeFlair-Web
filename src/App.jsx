import { BrowserRouter, Router, Routes } from "react-router"
import NavBar from "./NavBar"
import { Route } from "react-router"
import Body from "./Body"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Body /> }>
            <Route path="/login" element={ <div>Login page</div> } />
            <Route path="/profile" element={ <div>profile page</div> } />
          
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <NavBar /> */}
    </>
  )
}

export default App
