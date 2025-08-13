import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        imageUrl: {
			type: String, 
			required: true
		},
        albums: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album', // Reference to the Album schema
            },
        ],
        songs: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song', // Reference to the Song schema
            },
        ],
    },
    { timestamps: true }
);

export const Artist = mongoose.model("Artist", artistSchema);