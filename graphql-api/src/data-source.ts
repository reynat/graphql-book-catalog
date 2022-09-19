import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server-core";
import {
  AlbumResponse,
  ArtistResponse,
  CreateAlbumResponse,
  ArtistNotFoundError,
} from "./data-source-types";

export class MusicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8001";
  }

  async getAlbums() {
    return this.get("/albums");
  }

  async getAlbum(id: string) {
    return this.get(`/albums/${id}`);
  }

  async getArtist(id: string): Promise<ArtistResponse | undefined> {
    return this.get(`/artists/${id}`);
  }

  async createAlbum(
    title: string,
    artistId: string
  ): Promise<CreateAlbumResponse | ArtistNotFoundError | undefined> {
    return this.post("/albums", {
      title,
      artistId,
    })
      .then((album) => album)
      .catch((error: ApolloError) => {
        if (error.extensions.response?.status === 404) {
          return {
            message: "Artist not found",
          };
        }
        console.log(error, "Error creating album");
        return;
      });
  }
}
