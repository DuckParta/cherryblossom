import { useDispatch } from "react-redux";
import { festivalDataReducer } from "../features/reducers/festivalDataReducer";

import { Flex, Center, Button } from "@chakra-ui/react";

export default function CategoryBar() {
  const dispatch = useDispatch();
  const LOCATION_LIST = ["서울", "경기/인천", "충청/대전", "전라/광주", "경북/대구", "경남/부산/울산", "강원", "제주"];
  const locationButtonsList = LOCATION_LIST.map((location) => {
    return (
      <Button key={location} 
      value={location}
      onClick={handleLocationButtonClick}
      margin="10px"
      padding="10px"
      bgColor="transparent"
      fontSize="lg"
      >{location}
      </Button>
    )
  });

  function handleLocationButtonClick(e: any) {
    const target = e.target.value
    dispatch(festivalDataReducer.actions.filterLocation(target));
  }

  return (
    <>
    <Center marginTop="30px"
      boxShadow="0 0 15px rgb(0 0 0 / 15%)">
      <Flex flexFlow="row wrap" 
      justifyContent="space-around"
      width="70%"
      paddingY="20px"
      >{locationButtonsList}
      </Flex>
    </Center>
    </>
  )
}