import React from 'react';


import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Stripe from './Component/Stripe';

function App() {


  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Stripe/>}>

            </Route>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
