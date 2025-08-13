import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Artist', 
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		audioUrl: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
			required: false, // Optional field 
		},
		album: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",
			required: false,
		},
		duration: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
