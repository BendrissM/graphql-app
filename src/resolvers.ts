export const respolvers = {
    Query: {
        featuredPlaylists: async (_: any, __: any, { dataSources }: any) => {
            return dataSources.spotifyAPI.getFeaturedPlaylists();
        },
    },
}