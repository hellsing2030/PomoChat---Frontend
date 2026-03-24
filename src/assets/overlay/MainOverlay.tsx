import "./Overlay.css"

export const MainOverlay = () => {
  return (
    <div className="container-main">
        <span className="container-overlay-left"/>
        <div className="container-view-video-top-bottom">
          <span className="container-overlay-top"/>
          <div className="cam-overlay"></div>
          <span className="container-overlay-bottom"/>
        </div>
        <span className="container-overlay-right"/>
    </div>
  )
}
