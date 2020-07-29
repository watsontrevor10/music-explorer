import React from "react"
import { Link } from "gatsby"
import FavoriteArtists from "../components/favoriteArtists"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <FavoriteArtists />
  </Layout>
)

export default IndexPage
