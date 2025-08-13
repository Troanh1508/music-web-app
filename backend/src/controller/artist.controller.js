import { Artist } from "../models/artist.model.js";

export const getAllArtists = async (req, res, next) => {
    try {
        const artists = await Artist.find().populate("songs").populate("albums");
        res.status(200).json(artists);
    } catch (error) {
        next(error);
    }
};

export const getArtistById = async (req, res, next) => {
    try {
        const { artistId } = req.params;

        const artist = await Artist.findById(artistId).populate("songs").populate("albums");

        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.status(200).json(artist);
    } catch (error) {
        next(error);
    }
};
