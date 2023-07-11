import {
  Box,
  Wrap,
  WrapItem,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialButton = ({ Icon, label }) => {
  return (
    <IconButton
      aria-label={label}
      icon={Icon}
      variant={"unstyled"}
      size={["xs", "sm", "md", "lg"]}
    />
  );
};

export default function Footer() {
  return (
    <Box
      position="fixed"
      w="100%"
      left="0"
      bottom="0"
      bgGradient="linear(to-r, green.300, blue.100)"
      fontSize={["xx-small", "xs", "md", "xl"]}
    >
      <Wrap spacing={[1, 2, 3, 4]} justify="space-around" align={"center"}>
        <WrapItem>
          <Text>© 2020 All rights reserved</Text>
        </WrapItem>

        <WrapItem>
          <HStack spacing={4} justify={"center"}>
            <SocialButton label={"Twitter"} Icon={<FaTwitter />} />
            <SocialButton label={"YouTube"} Icon={<FaYoutube />} />
            <SocialButton label={"Instagram"} Icon={<FaInstagram />} />
          </HStack>
        </WrapItem>
      </Wrap>
    </Box>
  );
}
