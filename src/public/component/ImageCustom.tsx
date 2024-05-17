import React, { useState } from "react";
import { Animated, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import colorApp from "../colorApp";
import LoadingInContent from "./LoadingInContent";

const thumbnailAnimated = new Animated.Value(0);
const imageAnimated = new Animated.Value(0);

interface Iprops {
    source?: {
        uri: string
    },
    style?: Object,
    resizeMode?: string | any,
    type?: string | number,
    size?: number
}

export default function AsyncImage(props: Iprops) {

    let { source, style, resizeMode, type, size = 60 } = props
    const [isLoadEnd, setLoadEnd] = useState(false);

    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start(() => setLoadEnd(true));
    };

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    let thumbnailSource = source;
    type = type || "large";
    if (source?.uri) {
        const lengthUri = source?.uri.length;
        if (lengthUri > 0) {
            const picture = source?.uri;
            const typeImage = picture?.substr(picture.lastIndexOf("."));
            source = { uri: picture?.replace(typeImage, `_${type}${typeImage}`) };
            thumbnailSource = {
                uri: picture.replace(typeImage, `${typeImage}`),
            };
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {source?.uri ? (
                <>
                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <LoadingInContent color={colorApp.black_opacity_05} />
                    </View>
                    <Animated.Image
                        source={thumbnailSource}
                        style={[
                            { position: "absolute", left: 0, right: 0, bottom: 0, top: 0 },
                            { opacity: thumbnailAnimated },
                            style,
                        ]}
                        onLoad={() => handleThumbnailLoad()}
                        onLoadEnd={() => handleThumbnailLoad()}
                        blurRadius={1}
                        resizeMode={resizeMode}
                    />
                </>
            ) : (
                <FontAwesome name="image" color={colorApp.black_opacity_01} size={size} />
            )}
        </View>
    );
}
