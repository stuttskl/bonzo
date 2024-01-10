import React, { useEffect, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "../components/Player";
import { SafeAreaView } from "react-native-safe-area-context";

const spotifyApi = new SpotifyWebApi();

export interface IDashboardProps {
    code: string;
}

interface CurrentUsersProfileResponse {
    id: string;
    display_name: string;
}

const Dashboard = (props: IDashboardProps) => {
    spotifyApi.setAccessToken(props.code);
    const [user, setUser] =
        useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

    const [playlists, setPlaylists] = useState([{}]);

    useEffect(() => {
        spotifyApi
            .getMe()
            .then(response => {
                if (response) {
                    setUser(response.body);
                    // console.log(response.body);
                }
            })
            .catch(error => {
                console.log("ERROR: ", error);
            });
    }, []);

    // useEffect(() => {
    //   if (user) {
    //     spotifyApi
    //       .getUserPlaylists(user.display_name)
    //       .then((response) => {
    //         setPlaylists(response.body.items);
    //       })
    //       .catch((error) => {
    //         console.log("ERROR: ", error);
    //       });
    //   }
    // }, [user]);

    const PlaylistItem = ({ name }: any) => <Text>playlist name</Text>;
    return <Player code={props.code} />;
};

export default Dashboard;
