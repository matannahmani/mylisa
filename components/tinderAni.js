import { Platform } from "react-native";

const IS_ANDROID = Platform.OS === "android";
export function getInputRangeFromIndexes(range, index, carouselProps) {
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  let inputRange = [];

  for (let i = 0; i < range.length; i++) {
    inputRange.push((index - range[i]) * sizeRef);
  }

  return inputRange;
}

export function tinderScrollInterpolator(index, carouselProps) {
  const range = IS_ANDROID ? [1, 0, -1, -2, -3] : [3, 2, 1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;
  console.log("int");
  return { inputRange, outputRange };
}
export function tinderAnimatedStyles(
  index,
  animatedValue,
  carouselProps,
  cardOffset
) {
  console.log(carouselProps);
  const sizeRef = carouselProps.vertical
    ? carouselProps.itemHeight
    : carouselProps.itemWidth;
  const mainTranslateProp = carouselProps.vertical
    ? "translateY"
    : "translateX";
  const secondaryTranslateProp = carouselProps.vertical
    ? "translateX"
    : "translateY";

  const card1Scale = 0.96;
  const card2Scale = 0.92;
  const card3Scale = 0.88;

  const peekingCardsOpacity = IS_ANDROID ? 0.92 : 1;

  cardOffset = !cardOffset && cardOffset !== 0 ? 9 : cardOffset;

  const getMainTranslateFromScale = (cardIndex, scale) => {
    const centerFactor = (1 / scale) * cardIndex;
    return -Math.round(sizeRef * centerFactor);
  };

  const getSecondaryTranslateFromScale = (cardIndex, scale) => {
    return Math.round((cardOffset * Math.abs(cardIndex)) / scale);
  };

  return IS_ANDROID
    ? {
        // elevation: carouselProps.data.length - index, // fix zIndex bug visually, but not from a logic point of view
        opacity: animatedValue.interpolate({
          inputRange: [-3, -2, -1, 0, 1],
          outputRange: [0, peekingCardsOpacity, peekingCardsOpacity, 1, 0],
          extrapolate: "clamp",
        }),
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [-3, -2, -1, 0],
              outputRange: [card3Scale, card2Scale, card1Scale, 1],
              extrapolate: "clamp",
            }),
          },
          {
            rotate: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "22deg"],
              extrapolate: "clamp",
            }),
          },
          {
            [mainTranslateProp]: animatedValue.interpolate({
              inputRange: [-3, -2, -1, 0, 1],
              outputRange: [
                getMainTranslateFromScale(-3, card3Scale),
                getMainTranslateFromScale(-2, card2Scale),
                getMainTranslateFromScale(-1, card1Scale),
                0,
                sizeRef * 1.1,
              ],
              extrapolate: "clamp",
            }),
          },
          {
            [secondaryTranslateProp]: animatedValue.interpolate({
              inputRange: [-3, -2, -1, 0],
              outputRange: [
                getSecondaryTranslateFromScale(-3, card3Scale),
                getSecondaryTranslateFromScale(-2, card2Scale),
                getSecondaryTranslateFromScale(-1, card1Scale),
                0,
              ],
              extrapolate: "clamp",
            }),
          },
        ],
      }
    : {
        zIndex: carouselProps.data.length - index,
        opacity: animatedValue.interpolate({
          inputRange: [-1, 0, 1, 2, 3],
          outputRange: [0, 1, peekingCardsOpacity, peekingCardsOpacity, 0],
          extrapolate: "clamp",
        }),
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [1, card1Scale, card2Scale, card3Scale],
              extrapolate: "clamp",
            }),
          },
          {
            rotate: animatedValue.interpolate({
              inputRange: [-1, 0],
              outputRange: ["-22deg", "0deg"],
              extrapolate: "clamp",
            }),
          },
          {
            [mainTranslateProp]: animatedValue.interpolate({
              inputRange: [-1, 0, 1, 2, 3],
              outputRange: [
                -sizeRef * 1.1,
                0,
                getMainTranslateFromScale(1, card1Scale),
                getMainTranslateFromScale(2, card2Scale),
                getMainTranslateFromScale(3, card3Scale),
              ],
              extrapolate: "clamp",
            }),
          },
          {
            [secondaryTranslateProp]: animatedValue.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [
                0,
                getSecondaryTranslateFromScale(1, card1Scale),
                getSecondaryTranslateFromScale(2, card2Scale),
                getSecondaryTranslateFromScale(3, card3Scale),
              ],
              extrapolate: "clamp",
            }),
          },
        ],
      };
}
