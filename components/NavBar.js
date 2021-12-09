import { Center, Text } from "@chakra-ui/react";
import React from "react";

export default function NavBar() {
  return (
    <Center mt="5%" mb="2%">
      <Text className="main" fontSize={["2xl", "4xl", "5xl", "6xl"]}>
        Where is my PIZZA
      </Text>
    </Center>
  );
}
