import profileImage from '../assets/profile.png'

export default function PortraitPanel() {
  return (
    <aside className="portrait-panel" aria-label="Portrait of Kristina Zaporozhets">
      <div className="portrait-sticky">
        <div className="portrait-frame">
          <img
            className="portrait-image"
            src={profileImage}
            alt="Kristina Zaporozhets in professional attire"
            width="1772"
            height="1041"
            fetchPriority="high"
          />
        </div>
        {/* <p className="portrait-note"><span aria-hidden="true" /> Toronto, Canada</p> */}
      </div>
    </aside>
  )
}
