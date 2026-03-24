import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainOverlay } from './assets/overlay/MainOverlay'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainOverlay/>}/>
        <Route path="/overlay-start-stream" element={<MainOverlay/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
