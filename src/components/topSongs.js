import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { FaRegPlayCircle } from "react-icons/fa"
import { IconContext } from "react-icons"
import {
  Heading,
  MainContainer,
  EmbedContainer,
  ImageContainer,
} from "../styles/mainStyles"

// queries data from Spotify filtered (short_term = last 4 weeks, medium_term = last 6 months, long_term = all data) sorted according to listen order
const TopSongs = () => {
  const data = useStaticQuery(graphql`
    query TopSongs {
      allSpotifyTopTrack(
        limit: 10
        sort: { fields: order, order: ASC }
        filter: { time_range: { eq: "short_term" } }
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

  // sets beginning section of the spotify embed url to make it easier to swap out just the ID at the end
  const embedUrl = "https://open.spotify.com/embed/track/"
  // destructuring graphql data to simplify and make code more DRY
  const songNode = data.allSpotifyTopTrack.edges
  console.log(songNode)
  // grabs the song ID at the end of the spotifyId to be used at the end of embedUrl.
  // short_term = substr(12), medium_term = substr(13), long_term = substr(11)
  const initialSubNum = () => {
    if (songNode[0].node.spotifyId.includes("long")) {
      return 11
    } else if (songNode[0].node.spotifyId.includes("medium")) {
      return 13
    } else {
      return 12
    }
  }
  const [subNum, setSubNum] = useState(initialSubNum)
  const [songId, setSongId] = useState(
    songNode[0].node.spotifyId.substr(subNum)
  )

  return (
    <>
      <Heading>
        <h2>Recent Top Songs</h2>
      </Heading>
      {/* Spotify embed code, uses dynamic songId to change song on user input */}
      <EmbedContainer>
        <iframe
          src={embedUrl + songId}
          width="500"
          height="85"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </EmbedContainer>
      {/* Loops through all of the top songs listened to */}
      <PlaylistContainer>
        {data.allSpotifyTopTrack.edges.map((song, i) => {
          const sNode = song.node
          return (
            // Container set as a button, when clicked changes songId to be the new song
            <SongContainer>
              <TrackContainer
                onClick={() => setSongId(sNode.spotifyId.substr(subNum))}
              >
                <IconContext.Provider value={{ size: "2.5em" }}>
                  <IconContainer>
                    {/* <h1>{sNode.order + 1}</h1> */}
                    <FaRegPlayCircle />
                  </IconContainer>
                </IconContext.Provider>
              </TrackContainer>
              <NameContainer>
                <h4>{sNode.name}</h4>
                <span>{sNode.artistString}</span>
              </NameContainer>
            </SongContainer>
          )
        })}
      </PlaylistContainer>
    </>
  )
}

const PlaylistContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-height: 500px;
  align-items: center;
`

const SongContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 400px;
  background-color: #040404;
  border-top: 1px solid gray;
`

const TrackContainer = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  margin: auto;
  max-width: 300px;
`

const NameContainer = styled.div`
  width: 300px;
  padding: 10px;
`

const IconContainer = styled.div`
  padding: 1em;
  margin-top: 0.4em;
  /* background-color: blue; */
`

export default TopSongs
