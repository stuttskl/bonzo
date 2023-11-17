require("dotenv").config({ path: "/Users/katie/code/bonzo/.env" });
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
const querystring = require("querystring");
require("../db/config");

const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "user-library-modify",
    "user-library-read",
    "user-read-recently-played",
];

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
});

const generateToken = () => {
    return crypto.randomBytes(16).toString("hex");
};

const state = generateToken();
const stateKey = "spotify_auth_state";
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());

app.get("/login", async (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

app.get("/callback", async (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (error) {
        console.error("Callback Error:", error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(async (data) => {
            const access_token = data.body["access_token"];
            const refresh_token = data.body["refresh_token"];
            const expires_in = data.body["expires_in"];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log("access_token:", access_token);
            console.log("refresh_token:", refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`,
            );
            res.send("Success! You can now close the window.");

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body["access_token"];

                console.log("The access token has been refreshed!");
                console.log("access_token:", access_token);
                spotifyApi.setAccessToken(access_token);
            }, (expires_in / 2) * 1000);
        })
        .catch((error) => {
            console.error("Error getting Tokens:", error);
            res.send(`Error getting Tokens: ${error}`);
        });
});

app.listen(3001, () => {
    console.log(
        "HTTP Server up. Now go to http://localhost:3001/login in your browser.",
    );
});
