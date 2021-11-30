import { Box, Text, HStack, IconButton, Spinner, Factory } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import {
  tinderAnimatedStyles,
  tinderScrollInterpolator,
} from "../components/tinderAni";
import GestureRecognizer from "react-native-swipe-gestures";
import { LinearGradient } from "expo-linear-gradient";

const TinderCard = (props: any) => {
  if (props.item.last)
    return (
      <Box
        w="100%"
        justifyContent="center"
        alignItems="center"
        borderRadius={20}
        h="540px"
        bg="white"
      >
        <Spinner size="lg" />
        <Text mt={4}>Loading more styles</Text>
      </Box>
    );
  if (props.item.card)
    return <Box w="100%" borderRadius={20} h="540px" bg="blue.400"></Box>;
};
const SCREENWIDTH = Dimensions.get("screen").width;

const Home = () => {
  const carousel = useRef<any>(null);
  const [index, setIndex] = useState<Number>(0);
  // const NBLinearGradient = Factory(LinearGradient);
  const [data, setData] = useState([
    {},
    { last: true },
    { card: true },
    { card: true },
    { card: true },
    { card: true },
  ]);

  useEffect(() => {
    if (data[Number(index)].last) {
      console.log("end");
      setTimeout(() => {
        setData([
          {},
          { last: true },
          { card: true },
          { card: true },
          { card: true },
          { card: true },
        ]);
        carousel.current.snapToItem(data.length - 1);
      }, 500);
    }
  }, [index]);

  const onSwipe = (dir: "right" | "left") => {
    // const newData = [...data];
    // newData.pop();
    carousel.current.snapToPrev();
  };

  return (
    <Box bg="white" h="100%" w="100%">
      <GestureRecognizer
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        onSwipeLeft={() => onSwipe("left")}
        onSwipeRight={() => onSwipe("right")}
      >
        <Box mt="24px">
          <Carousel
            ref={(c) => {
              carousel.current = c;
            }}
            layout="tinder"
            data={data}
            //@ts-ignore
            renderItem={TinderCard}
            scrollEnabled={false}
            onLayout={() => carousel.current.snapToItem(data.length - 1)}
            onBeforeSnapToItem={(i) => setIndex(i)}
            sliderWidth={SCREENWIDTH}
            itemWidth={SCREENWIDTH * 0.85}
            itemHeight={400}
          />
        </Box>
      </GestureRecognizer>
      <HStack mt="auto" mb="auto" w="100%" justifyContent="center">
        <IconButton
          background="white"
          borderWidth={1}
          borderColor="#E4E4E5"
          rounded="full"
          android_ripple={{ color: "#24292F33", borderless: true, radius: 40 }}
          _pressed={{ bg: "#24292F33" }}
          mr={12}
          onPress={() => carousel.current.snapToPrev()}
          icon={
            <Feather
              name="x"
              style={{
                textAlignVertical: "center",
                textAlign: "center",
                margin: 6,
              }}
              size={36}
              color="black"
            />
          }
        />
        <LinearGradient
          colors={["#F1A1B7", "#F76D96"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ borderRadius: 100 }}
        >
          <IconButton
            rounded="full"
            onPress={() => carousel.current.snapToPrev()}
            _pressed={{ bg: "#F76D96" }}
            android_ripple={{ color: "#F76D96", borderless: true, radius: 40 }}
            icon={
              <FontAwesome
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                  margin: 8,
                }}
                size={36}
                name="heart"
                color="white"
              />
            }
          />
        </LinearGradient>
      </HStack>
    </Box>
  );
};

export default Home;
