
import { CountDownPomo } from "../../components/CountDownPomo"
import "./Overlay.css"

export const MainOverlay = () => {
  return (
    <div className="container-main">
        <div className="container-overlay-left">
          <CountDownPomo/>
        </div>
        <div className="container-view-video-top-bottom">
          <span className="container-overlay-top"/>
          <div className="cam-overlay">
            <div className="container-corner">
              <span className="corner corner-1" />
              <span className="corner corner-2" />
              <span className="corner corner-3" />
              <span className="corner corner-4" />
            </div>
          </div>
          <span className="container-overlay-bottom"/>
        </div>
        <span className="container-overlay-right"/>
    </div>
  )
}
