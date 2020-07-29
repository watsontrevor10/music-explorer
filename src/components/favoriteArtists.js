import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const FavoriteArtists = () => {
  const data = useStaticQuery(graphql`
    query FaveArtists {
      allSpotifyTopArtist(
        filter: { time_range: { eq: "medium_term" } }
        sort: { fields: order, order: ASC }
      ) {
        edges {
          node {
            name
            time_range
            popularity
            order
            genres
            followers {
              total
            }
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                    originalName
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  console.log(data)

  return (
    <>
    <Heading>

      <h1>Favorite Artists</h1>
      <h2>In the Last 6 Months</h2>
    </Heading>
      <hr />
      <MainContainer>
        {data.allSpotifyTopArtist.edges.map(artist => (
          <ContentContainer>
            <ImageContainer>
              <Img fluid={artist.node.image.localFile.childImageSharp.fluid} />
            </ImageContainer>
            <TextContainer>
              <h3>{artist.node.name}</h3>
              {/* <p>Popularity: {artist.node.popularity}</p>
              <p>Followers: {artist.node.followers.total}</p> */}
              {/* <p>Genres: {artist.node.genres}</p> */}
            </TextContainer>
          </ContentContainer>
        ))}
      </MainContainer>
    </>
  )
}

const Heading = styled.div`
  text-align: center;
`

const MainContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
`

const ContentContainer = styled.div`
  margin: 0 auto;
  width: 12em;
`

const ImageContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  break-inside: avoid-column;
`

const Image = styled(Img)`
  width: 100% !important;
`

const TextContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`

export default FavoriteArtists
