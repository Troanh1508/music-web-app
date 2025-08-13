import {Favorite} from "../models/favorite.model.js";
import { Song } from "../models/song.model.js";

export const getFavoriteSongs = async (req, res, next) => {
    try {
        const {user} = req.params;

        const favorites = await Favorite.find({ user: user }).populate("song");
        const favoriteSongs = await Song.find({ _id: { $in: favorites.map(fav => fav.song) } }).populate("artist").populate("album");

        res.status(200).json(favoriteSongs);
    } catch (error) {
        next(error);
    }
}

export const getFavoriteSongsMobile = async (req, res, next) => {
    try {
        const {user} = req.params;

        const favorites = await Favorite.find({ user: user }).populate("song");
        const favoriteSongs = await Song.find({ _id: { $in: favorites.map(fav => fav.song) } }).populate("artist").populate("album");

        res.status(200).json(favoriteSongs);
    } catch (error) {
        next(error);
    }
}

export const toggleFavoriteSong = async (req, res, next) => {
  try {
    const { user, song } = req.body;

    const exists = await Favorite.findOne({ user, song });

    if (exists) {
      // Remove from favorites
      await Favorite.findOneAndDelete({ user, song });
      return res.status(200).json({ message: "Song removed from favorites", favorited: false });
    } else {
      // Add to favorites
      const favorite = new Favorite({ user, song });
      await favorite.save();
      return res.status(201).json({ message: "Song added to favorites", favorited: true });
    }
  } catch (error) {
    next(error);
  }
};

export const toggleFavoriteSongMobile = async (req, res, next) => {
  try {
    const { user, song } = req.body;

    const exists = await Favorite.findOne({ user, song });

    if (exists) {
      // Remove from favorites
      await Favorite.findOneAndDelete({ user, song });
      return res.status(200).json({ message: "Song removed from favorites", favorited: false });
    } else {
      // Add to favorites
      const favorite = new Favorite({ user, song });
      await favorite.save();
      return res.status(201).json({ message: "Song added to favorites", favorited: true });
    }
  } catch (error) {
    next(error);
  }
};