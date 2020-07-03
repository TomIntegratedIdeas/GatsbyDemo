import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import {
  FaFacebookF,
  FaPhoneAlt,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa"

import contactStyles from "./contact.module.scss"

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSocialLink(filter: { node_locale: { eq: "en-US" } }) {
        edges {
          node {
            title
            url
          }
        }
      }
    }
  `)

  console.log(data)

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState }),
    })
      .then(() => {})
      .catch(error => alert(error))

    e.preventDefault()
  }

  //function for dynamic links

  const redirectTo = url => {
    window.location.href = `${url}`
  }

  return (
    <Layout>
      <Head pageTitle="Contact" />
      <h1 className={contactStyles.titleUnderline}>Contact</h1>
      <div className={contactStyles.flexContainer}>
        <div className={contactStyles.iconContainer}>
          <h2>Get In Touch With Us Directly...</h2>
          {data.allContentfulSocialLink.edges.map(edge => {
            return (
              <React.Fragment>
                {console.log(edge.node.title)}
                {/*Phone conditional*/}
                {edge.node.title === "Phone" ? (
                  <div
                    className={contactStyles.iconWrap}
                    onClick={() => redirectTo(edge.node.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaPhoneAlt className={contactStyles.phone} />
                    &nbsp;&nbsp;
                    <a>{edge.node.url}</a>
                  </div>
                ) : null}
                {edge.node.title === "Email" ? (
                  <div
                    className={contactStyles.iconWrap}
                    onClick={() => redirectTo(edge.node.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaEnvelope className={contactStyles.email} />
                    &nbsp;&nbsp;
                    <a>{edge.node.title}</a>
                  </div>
                ) : null}
                {edge.node.title === "Facebook" ? (
                  <div
                    className={contactStyles.iconWrap}
                    onClick={() => redirectTo(edge.node.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaFacebookF className={contactStyles.facebook} />
                    &nbsp;&nbsp;
                    <a>{edge.node.title}</a>
                  </div>
                ) : null}
                {edge.node.title === "Instagram" ? (
                  <div
                    className={contactStyles.iconWrap}
                    onClick={() => redirectTo(edge.node.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaInstagram className={contactStyles.insta} />
                    &nbsp;&nbsp;
                    <a>{edge.node.title}</a>
                  </div>
                ) : null}
                {edge.node.title === "Twitter" ? (
                  <div
                    className={contactStyles.iconWrap}
                    onClick={() => redirectTo(edge.node.url)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaTwitter className={contactStyles.twitter} />
                    &nbsp;&nbsp;
                    <a>{edge.node.title}</a>
                  </div>
                ) : null}
              </React.Fragment>
            )
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <h2>Or Leave Us a Message... </h2>
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formState.name}
            placeholder="Name"
          ></input>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formState.email}
            placeholder="Email"
          ></input>
          <textarea
            id={contactStyles.message}
            type="text"
            name="message"
            onChange={handleChange}
            value={formState.message}
            placeholder="Message"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage
