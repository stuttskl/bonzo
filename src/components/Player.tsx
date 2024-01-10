import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/PlayerStyles";
import SpotifyWebApi from "spotify-web-api-node";
import { Slider } from "react-native-ui-lib";

interface ITrackData {
    id: string;
    title: string;
    artist: string[];
    album: string;
    image: string | undefined;
    uri: string;
}

interface IPlayerProps {
    code: string;
}

const spotify = new SpotifyWebApi();

const Player = (props: IPlayerProps) => {
    const [track, setTrack] = useState<ITrackData>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const data = {
        album: {
            album_type: "album",
            artists: [
                {
                    external_urls: {
                        spotify:
                            "https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHyP",
                    },
                    href: "https://api.spotify.com/v1/artists/7tYKF4w9nC0nq9CsPZTHyP",
                    id: "7tYKF4w9nC0nq9CsPZTHyP",
                    name: "SZA",
                    type: "artist",
                    uri: "spotify:artist:7tYKF4w9nC0nq9CsPZTHyP",
                },
            ],
            href: "https://api.spotify.com/v1/albums/07w0rG5TETcyihsEIZR3qG",
            id: "07w0rG5TETcyihsEIZR3qG",
            images: [
                {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
                    width: 640,
                },
                {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1",
                    width: 300,
                },
                {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d0000485170dbc9f47669d120ad874ec1",
                    width: 64,
                },
            ],
            name: "SOS",
            release_date: "2022-12-09",
            release_date_precision: "day",
            total_tracks: 23,
            type: "album",
            uri: "spotify:album:07w0rG5TETcyihsEIZR3qG",
        },
        disc_number: 1,
        duration_ms: 278480,
        explicit: true,
        href: "https://api.spotify.com/v1/tracks/4PMqSO5qyjpvzhlLI5GnID",
        id: "4PMqSO5qyjpvzhlLI5GnID",
        name: "Good Days",
        type: "track",
        uri: "spotify:track:4PMqSO5qyjpvzhlLI5GnID",
    };

    const currentTrack: ITrackData = {
        id: data.id,
        title: data.name,
        artist: [data.album.artists[0].name],
        album: data.album.name,
        image: data.album.images[1].url,
        uri: data.uri,
    };

    spotify.setAccessToken(props.code);

    useEffect(() => {
        setTrack(currentTrack);
    }, []);

    const backTrack = () => {
        //
    };

    const skipTrack = () => {
        //
    };
    const pausePlayback = () => {
        console.log("pause play back");
        spotify
            .pause()
            .then(response => {
                console.log(response.statusCode);
                setIsPlaying(false);
            })
            .catch((error: any) => {
                console.log("error: ", error);
            });
    };

    const startPlayback = () => {
        console.log("startplayback");
        spotify
            .transferMyPlayback(["b9c6627a286524e065923106f1561b08888c0df5"])
            .then(() => {
                spotify
                    .play({
                        uris: ["spotify:track:4PMqSO5qyjpvzhlLI5GnID"],
                    })
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error: any) => {
                        console.log("error: ", error);
                    });
            })
            .catch((error: any) => {
                console.log("error: ", error);
            });
    };

    return (
        <ImageBackground
            source={require("../assets/bg.jpg")}
            style={styles.backgroundImage}>
            <View style={styles.overlay}>
                {track && (
                    <>
                        <View style={styles.textGroup}>
                            <Text style={styles.titleText}>{track.title}</Text>
                            <Text style={styles.artistText}>
                                {track.artist} - {track.album}
                            </Text>
                        </View>
                        <View style={styles.iconGroup}>
                            <TouchableOpacity onPress={() => backTrack()}>
                                <Icon
                                    name="play-skip-back-outline"
                                    style={styles.icons}
                                />
                            </TouchableOpacity>
                            {isPlaying ? (
                                <TouchableOpacity
                                    onPress={() => pausePlayback()}>
                                    <Icon
                                        name="pause-sharp"
                                        style={styles.icons}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => startPlayback()}>
                                    <Icon name="play" style={styles.icons} />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => skipTrack()}>
                                <Icon
                                    name="play-skip-forward-outline"
                                    style={styles.icons}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sliderContainer}>
                            <Icon
                                name="volume-medium-outline"
                                style={styles.volumeIcon}
                            />
                            <Slider
                                value={50}
                                minimumValue={0}
                                maximumValue={100}
                                step={25}
                                containerStyle={styles.slider}
                                trackStyle={styles.track}
                                thumbStyle={styles.thumb}
                                activeThumbStyle={styles.activeThumb}
                                thumbTintColor={"rgba(255, 255, 255, 0.5)"}
                                minimumTrackTintColor={styles.minTrackColor}
                                maximumTrackTintColor={styles.maxTrackColor}
                            />
                        </View>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

export default Player;
