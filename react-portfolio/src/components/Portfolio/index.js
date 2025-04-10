import React, { useEffect, useState } from "react"
import Loader from "react-loaders"
import AnimatedLetters from "../AnimatedLetters"
import portfolioData from "../../data/portfolio.json" // ✅ Make sure it's valid JSON
import "./index.scss"

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState("text-animate")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const renderPortfolio = (portfolio) => {
    if (!Array.isArray(portfolio)) {
      return <p>No portfolio items found.</p>
    }

    return (
      <div className="images-container">
        {portfolio.map((port, idx) => (
          <div className="image-box" key={idx}>
            <img
              src={port.cover}
              className="portfolio-image"
              alt="portfolio"
            />
            <div className="content">
              <p className="title">{port.title}</p>
              <h4 className="description">{port.description}</h4>
              <button
                className="btn"
                onClick={() => window.open(port.url, "_blank", "noopener,noreferrer")}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Portfolio".split("")}
            idx={15}
          />
        </h1>
        {renderPortfolio(portfolioData.portfolio)} {/* ✅ Passing data */}
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Portfolio

