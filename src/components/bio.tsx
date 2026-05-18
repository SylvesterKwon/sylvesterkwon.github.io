import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <p>
        소프트웨어 개발자 권도현입니다. 문제해결을 좋아합니다.
        <br />
        Email: sylvesterkwon@gmail.com
      </p>
    </div>
  )
}

export default Bio
