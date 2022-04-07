import CategoryBar from "./CategoryBar";
import FestivalsList from "./FestivalsList";

import { Center, Box } from "@chakra-ui/react";
import { useFireStore } from "../../common/hooks/useFireStore";
import CreateSkeletonItems from "./CreateSkeletonItems";

export default function FestivalsWrapper() {
  const loading = useFireStore();

  return (
    <Box>
      <CategoryBar />
      <Center bg="gray.50" paddingTop="100px">
        {loading ? <CreateSkeletonItems /> : <FestivalsList />}
      </Center>
    </Box>
  );
}
