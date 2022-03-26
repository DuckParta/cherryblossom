import CategoryBar from "./CategoryBar";
import FestivalsList from "./FestivalsList";

import { Center } from "@chakra-ui/react";

export default function Container() {
  
  return (
    <>
    <CategoryBar />
    <Center>
      <FestivalsList />
    </Center>
    </>
  ) 
}
