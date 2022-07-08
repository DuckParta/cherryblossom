import CategoryBar from "../../../components/CategoryBar";
import FestivalsList from "./FestivalsList";

import { Center, Box } from "@chakra-ui/react";
import { useFireStore } from "../../../hooks/useFireStore";
import CreateSkeletonItems from "./CreateSkeletonItems";

const FestivalsWrapper = () => {
  const isLoading = useFireStore();

  return (
    <Box>
      <CategoryBar />
      <Center bg="gray.50" paddingTop="100px">
        {isLoading ? <CreateSkeletonItems /> : <FestivalsList />}
      </Center>
    </Box>
  );
};

export default FestivalsWrapper;
