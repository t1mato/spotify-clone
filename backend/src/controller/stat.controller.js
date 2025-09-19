import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
    try {
        // this code runs in parallel rather than step by step
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    // Step 1: Combine song and album collections
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    // Step 2: Group by artist name (removes duplicates)
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    // Step 3: Count the unique groups
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0,
            // $count returns an array with one object (ex: [{count: 42}])
        });
    } catch (error) {
        next(error)
    }
}
