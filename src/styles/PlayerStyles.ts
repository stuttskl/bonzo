import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        flexDirection: "column",
    },
    textGroup: {
        flex: 2,
        padding: 20,
    },
    titleText: {
        color: "white",
        fontSize: 32,
        textTransform: "uppercase",
        alignContent: "flex-start",
    },
    artistText: {
        color: "white",
        fontSize: 18,
        marginTop: 5,
        textTransform: "lowercase",
    },
    iconGroup: {
        flex: 1,
        flexDirection: "row",
        padding: 50,
    },
    icons: {
        color: "white",
        padding: 30,
        fontSize: 40,
    },
    slider: {
        flex: 9,
        margin: 20,
    },
    sliderContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        flex: 1,
        padding: 10,
    },
    track: {
        height: 2,
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderColor: "white",
        borderWidth: 1,
        shadowColor: "white",
    },
    activeThumb: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: "#2e343b",
        borderWidth: 2,
    },
    volumeIcon: {
        flex: 1,
        fontSize: 40,
        color: "white",
        textAlign: "center",
        padding: 5,
    },
    minTrackColor: "#deb4b1",
    maxTrackColor: "#6d7c8a",
});
