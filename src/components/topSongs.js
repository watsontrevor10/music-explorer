import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import {
  Heading,
  MainContainer,
  EmbedContainer,
  ImageContainer,
} from "../styles/mainStyles"

const TopSongs = () => {
  const data = useStaticQuery(graphql`
    query TopSongs {
      allSpotifyTopTrack(
        sort: { fields: order, order: ASC }
        filter: { time_range: { eq: "medium_term" } }
      ) {
        edges {
          node {
            name
            spotifyId
            album {
              name
            }
            artistString
            order
            external_urls {
              spotify
            }
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    originalImg
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const songNode = data.allSpotifyTopTrack.edges
  const [songIndex, setSongIndex] = useState(0)
  const [songId, setSongId] = useState(
    songNode[songIndex].node.spotifyId.substr(13)
  )
  const embedUrl = "https://open.spotify.com/embed/track/"

  return (
    <>
      <Heading>
        <h2>Recent Songs</h2>
      </Heading>
      <EmbedContainer>
        <iframe
          src={embedUrl + songId}
          width="300"
          height="85"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </EmbedContainer>
      <MainContainer>
        {data.allSpotifyTopTrack.edges.map((song, i) => {
          const sNode = song.node
          console.log(sNode)
          return (
            <TrackContainer onClick={() => setSongId(sNode.spotifyId.substr(13)) }>
              <h4>{sNode.name}</h4>
              <span>{sNode.artistString}</span>
            </TrackContainer>
          )
        })}
      </MainContainer>
    </>
  )
}

const TrackContainer = styled.button`
  /* border: 1px solid white; */
  margin: 5px auto;
  text-align: center;
`

export default TopSongs
