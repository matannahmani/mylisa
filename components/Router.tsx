import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Box,
  HStack,
  IconButton,
  Image,
  Icon,
  Button,
} from "native-base";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import RippleButton from "./RippleButton";
import { alignItems } from "styled-system";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      {/* <Button mt="0" mb="auto">
        Test
      </Button> */}
      <RippleButton
        width="100px"
        marginTop="auto"
        marginBottom="auto"
        _text={{ textAlign: "center" }}
        colorScheme="green"
      >
        Test
      </RippleButton>
    </View>
  );
}

const Tab = createBottomTabNavigator();

interface HeartCount {
  count: Number;
}

const CustomerHeart = ({ count }: HeartCount) => {
  if (count === 0) {
    return (
      <IconButton
        icon={<FontAwesome name="heart" size={24} color="#BCD2FF" />}
      />
    );
  } else {
    return (
      <Box position="relative">
        <IconButton
          icon={<FontAwesome name="heart" size={24} color="#BCD2FF" />}
        />
        <Text
          position="absolute"
          top={0}
          rounded="full"
          fontSize="xs"
          pl={1.5}
          borderWidth={1.5}
          borderColor="white"
          textAlign="center"
          pr={1.5}
          right={-1.5}
          bg="#da7b94"
          color="white"
        >
          {count}
        </Text>
      </Box>
    );
  }
};

const Header = () => (
  <SafeAreaView>
    <HStack pl={2} pr={2} h="40px" bg="white">
      <Image
        w="120px"
        h="40px"
        resizeMode="contain"
        source={require("../assets/logo.png")}
      />
      <HStack ml="auto">
        <CustomerHeart count={2} />
        <IconButton
          icon={<Ionicons name="settings" size={24} color="black" />}
        />
      </HStack>
    </HStack>
  </SafeAreaView>
);

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          header: Header,
          tabBarStyle: {
            width: "80%",
            height: 64,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 24,
            borderRadius: 16,
            backgroundColor: "#0a0707",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="explore"
                size={32}
                color={focused ? "white" : "#A0A0A0"}
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person"
                size={32}
                color={focused ? "white" : "#A0A0A0"}
              />
            ),
          }}
          name="Person"
          component={SettingsScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="hotjar"
                size={32}
                color={focused ? "white" : "#A0A0A0"}
              />
            ),
          }}
          name="Hot"
          component={SettingsScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="chat"
                size={32}
                color={focused ? "white" : "#A0A0A0"}
              />
            ),
          }}
          name="Chat"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
