import React from "react"

function About() {
  return (
    <div className="aboutPage container mt-4">
      <div className="row">
        <h1>About Me</h1>
        <div className="col-sm-8">
          Hello I'm Danny Rodriguez, have fun shopping this holiday season? <a href="https://www.linkedin.com/in/danny-alfredo-rodriguez/">Let me know what you think of the New York Collection</a>.
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h1 className="mt-4">Credits</h1>
              <h3>Assets</h3>
              <a href="https://unsplash.com/photos/ycVFts5Ma4s?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">Homepage splash image from Hannah Morgan</a>
              <a href="http://fakestoreapi.com/">"Fake Store API" by MohammadReza Keikavousi</a>

              <h1 className="mt-3">Technology Stack</h1>
              <h3>Frontend</h3>
              <a href="https://reactjs.org/">ReactJS - Frontend</a>
              <a href="https://getbootstrap.com/">Bootstrap - Styling</a>
              <a href="https://sass-lang.com/">Sass - Styling</a>

              <h3 className="mt-2">Backend</h3>
              <a href="https://nodejs.org/en/">Node.js - Server</a>
              <a href="https://expressjs.com/">Express.js - Node Framework</a>
            </div>
            <div className="d-flex flex-column mt-4 mx-auto">
              <h3>Favorite Books</h3>
              <a href="https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654">The Design of Everyday Things</a>
              <a href="https://www.amazon.com/Originals-audiobook/dp/B01A7Q61LI/">Originals</a>
              <a href="https://www.amazon.com/How-Win-Friends-Influence-People/dp/B0006IU7JK/">How to Make Friends and Influence People</a>
              <a href="https://www.amazon.com/Triumph-City-Greatest-Invention-Healthier/dp/0143120549/">Triumph of the City</a>
              <a href="https://www.amazon.com/Jobs-Be-Done-Theory-Practice/dp/B08R8ZGPXP/">Jobs to Be Done</a>

              <h3 className="mt-3">Civic Interests</h3>
              <a href="https://en.wikipedia.org/wiki/California_housing_shortage">California Housing Shortage and Solutions</a>
              <a href="https://en.wikipedia.org/wiki/Traffic_congestion">Traffic Solutions</a>
              <a href="https://en.wikipedia.org/wiki/Bowling_Alone">Civic Participation and Social Capital</a>

              <h3 className="mt-3">Fun Coding Readings</h3>
              <a href="https://divyanshu013.dev/blog/temporal-dead-zone/">Temporal Dead Zone</a>
              <a href="https://joyofcode.xyz/dark-mode-favicon">Favicon That Works For Light And Dark Mode</a>
              <a href="https://betterexplained.com/articles/understanding-quakes-fast-inverse-square-root/">Understanding Quake’s Fast Inverse Square Root</a>
            </div>
          </div>
        </div>

        <div className="col-sm-4 d-flex flex-column">
          <img src="https://danny-rodriguez.github.io/portfolio/img/professional-shot.jpg" className="portrait" referrerPolicy="no-referrer" alt="Danny Rodriguez LinkedIn Photo" width="416" height="562" />
          <p>
            <strong>Location:</strong> San Diego, CA
          </p>
          <p>
            <strong>Hobbies:</strong> Reading, Civics, Coding
          </p>
          <div className="d-flex">
            <p>
              <strong>Social:&nbsp;</strong>{" "}
            </p>
            <div className="aboutSocial">
              <a href="https://www.linkedin.com/in/danny-alfredo-rodriguez/">
                LinkedIn <i className="bi bi-linkedin"></i>
                <i className="bi bi-link-45deg tdLinkIcon"></i>
              </a>
              <a href="https://github.com/Danny-Rodriguez">
                GitHub <i className="bi bi-github"></i>
                <i className="bi bi-link-45deg tdLinkIcon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
