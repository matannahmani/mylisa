import { Box, Button, IButtonProps, useToken } from "native-base";
import React from "react";
import { Platform } from "react-native";

const RippleButton = (props: IButtonProps) => {
  const IS_ANDROID = Platform.OS === "android";
  if (IS_ANDROID)
    return (
      <Box
        margin={props.margin || props.m}
        mt={props.mt || props.marginTop}
        mb={props.mb || props.marginBottom}
        ml={props.ml || props.marginLeft}
        mr={props.mr || props.marginRight}
        w={props.w || props.width || "90%"}
        borderRadius={props.borderRadius || 10}
        overflow="hidden"
      >
        <Button {...props} margin="0" width="100%">
          {props.children}
        </Button>
      </Box>
    );
  return <Button {...props}>{props.children}</Button>;
};

export default RippleButton;
