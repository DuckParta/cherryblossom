import { Flex, Center, CheckboxGroup } from "@chakra-ui/react";
import { LocationCheckbox } from "./LocationCheckbox";

export default function CategoryBar() {
  const LOCATION_LIST = [
    "서울",
    "경기/인천",
    "충청/대전",
    "전라/광주",
    "경북/대구",
    "경남/부산/울산",
    "강원",
    "제주",
    "기타",
  ];

  const locationButtonsList = LOCATION_LIST.map((location) => {
    return <LocationCheckbox key={location} location={location} />;
  });

  return (
    <>
      <Center marginTop="30px" boxShadow="0 0 15px rgb(0 0 0 / 15%)">
        <Flex
          flexFlow="row wrap"
          justifyContent="space-around"
          width="80%"
          paddingY="20px"
        >
          <CheckboxGroup>{locationButtonsList}</CheckboxGroup>
        </Flex>
      </Center>
    </>
  );
}
