import { Flex, Box } from "@chakra-ui/react";
import SkeletonFestivalItem from "../UI/SkeletonFestivalItem";

export default function CreateSkeletonItems() {
  const range = (num: number) => [...Array(num).keys()];

  return (
    <Flex flexFlow="row wrap" justifyContent="space-around" width="70%">
      {range(12).map((key) => (
        <Box key={JSON.stringify(key)}>
          <SkeletonFestivalItem />
        </Box>
      ))}
    </Flex>
  );
}