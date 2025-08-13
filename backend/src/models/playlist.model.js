import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"playlist",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song', 
        },
    ],
    createdAt: { type: Date, default: Date.now }
}, { strictPopulate: false });

export const Playlist = mongoose.model('Playlist', playlistSchema);
