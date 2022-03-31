import CategoryBar from "./CategoryBar";
import FestivalsList from "./FestivalsList";

import { Center, Box } from "@chakra-ui/react";

export default function Container() {
  return (
    <Box>
      <CategoryBar />
      <Center bg="gray.50" paddingTop="100px">
        <FestivalsList />
      </Center>
    </Box>
  );
}
