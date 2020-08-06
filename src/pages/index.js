import React from "react"
import { Link } from "gatsby"
import FavoriteArtists from "../components/favoriteArtists"
import ListeningNow from "../components/listeningNow"
import TopSongs from "../components/topSongs"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <ListeningNow /> */}
    <TopSongs />
    <FavoriteArtists />
  </Layout>
)

export default IndexPage
