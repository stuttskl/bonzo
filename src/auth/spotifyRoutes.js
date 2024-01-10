import { credentials, discovery, credsB64 } from "../auth/spotify";
import {
    formatCredentials,
    setAccessToken,
    setRefreshToken,
    setExpirationToken,
    getAccessToken,
    getRefreshToken,
    getExpirationToken,
} from "../utils/spotifyHelpers";

export const getTokens = async authorizationCode => {
    const url = discovery.tokenEndpoint;
    const payload = {
        method: "POST",
        headers: {
            Authorization: `Basic ${credsB64}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`,
    };

    const body = await fetch(url, payload);
    const response = await body.json();
    const spotifyCredentials = formatCredentials(response);

    await setAccessToken(spotifyCredentials.accessToken);
    await setRefreshToken(spotifyCredentials.accessToken);
    await setExpirationToken(spotifyCredentials.expiresAt);
};

export const refreshTokens = async () => {
    const url = discovery.tokenEndpoint;
    const refreshToken = await getRefreshToken();
    const payload = {
        method: "POST",
        headers: {
            Authorization: `Basic ${credsB64}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    };

    try {
        const body = await fetch(url, payload);
        const response = await body.json();
        const spotifyCredentials = formatCredentials(response);

        await setAccessToken(spotifyCredentials.accessToken);
        await setRefreshToken(spotifyCredentials.accessToken);
        await setExpirationToken(spotifyCredentials.expiresAt);
    } catch (e) {
        console.log("ERROR: ", e);
    }
};
