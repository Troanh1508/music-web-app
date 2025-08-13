import { Playlist } from "../models/playlist.model.js";



export const getPlaylists = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const playlists = await Playlist.find({ user: userId }).populate("song");
        res.status(200).json(playlists);
    } catch (error) {
        next(error);
    }
}

export const getPlaylistById = async (req, res, next) => {
  try {
    const { playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId).populate("user");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};



export const createPlaylist = async (req, res, next) => {
  try {
    const { name, userId, songIds } = req.body;

    const playlist = new Playlist({
      name,
      user: userId,
      songs: songIds || [], // optional
    });

    const saved = await playlist.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const updatePlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const { name, songIds } = req.body;

    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        ...(name && { name }),
        ...(songIds && { songs: songIds }),
      },
      { new: true }
    ).populate("songs");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;

    const deleted = await Playlist.findByIdAndDelete(playlistId);

    if (!deleted) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    next(error);
  }
};

export const addSongToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Avoid duplicates
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    const updatedPlaylist = await Playlist.findById(playlistId);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    next(error);
  }
};

export const removeSongFromPlaylist = async (req, res, next) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    playlist.songs.pull(songId);
    await playlist.save();

    res.status(200).json({ message: 'Song removed', playlist });
  } catch (error) {
    next(error);
  }
};