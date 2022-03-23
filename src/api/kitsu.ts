import axios from "axios"
import { KitsuGenres } from "../typings/IKitsu"

// * get anime
export const getAnime = async (query: string) => {
  try {
    const { data } = await axios.get(
      `https://kitsu.io/api/edge/anime?filter[text]=${query}`
    )
    return data.data[0]
  } catch (error) {
    console.error(error)
  }
}

// * get genre
export const getGenres = async (id: string) => {
  try {
    const { data } = await axios.get(id)
    const genresRequest = await axios.get(data.links.first)

    const genresResponse = genresRequest.data.data.map(
      (genre: Record<string, KitsuGenres>) => genre.attributes.name
    )
    if (genresResponse.length === 0) return ["-"]

    return genresResponse
  } catch (error) {
    console.error(error)
  }
}
