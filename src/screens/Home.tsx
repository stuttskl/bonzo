import { Button } from "react-native";
import { useEffect } from "react";
import { useAuthRequest } from "expo-auth-session";
import { useState } from "react";
import { credentials, discovery, scopes } from "../auth/spotify";
import Dashboard from "./Dashboard";
import {
    getAccessToken,
    getRefreshToken,
    getExpirationToken,
} from "../utils/spotifyHelpers";
import { getTokens, refreshTokens } from "../auth/spotifyRoutes";

const HomeScreen = () => {
    const [authorizationCode, setAuthorizationCode] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string | null | undefined>(
        null
    );

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: credentials.clientId,
            scopes: scopes,
            usePKCE: false,
            redirectUri: credentials.redirectUri,
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === "success") {
            setAuthorizationCode(response.params.code);
        }
    }, [response]);

    useEffect(() => {
        if (authorizationCode) {
            getTokens(authorizationCode);
        }
    }, [authorizationCode]);

    useEffect(() => {
        const checkIfAccess = async () => {
            return await getAccessToken();
        };

        const fetchData = async () => {
            const accessToken = await checkIfAccess();
            setAccessToken(accessToken);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const checkTokenExpirationTime = async () => {
            const tokenExpirationTime = await getExpirationToken();
            if (tokenExpirationTime) {
                const timestamp = parseInt(tokenExpirationTime, 10);
                const expiresAt = new Date(timestamp);
                const now = new Date();

                if (expiresAt.getTime() >= now.getTime()) {
                    // token is still good
                } else {
                    await refreshTokens();
                }
            }
        };
        checkTokenExpirationTime();
    }, []);

    return (
        <>
            {accessToken ? (
                <Dashboard code={accessToken} />
            ) : (
                <Button
                    title="Connect Spotify Account"
                    onPress={() => {
                        promptAsync();
                    }}
                />
            )}
        </>
    );
};

export default HomeScreen;
