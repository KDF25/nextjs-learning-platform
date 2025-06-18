import Mux from "@mux/mux-node";

export const MUX_DATA = new Mux({
	tokenId: process.env.MUX_TOKEN_ID || "",
	tokenSecret: process.env.MUX_TOKEN_SECRET || ""
});
