import { Flex, Center, CheckboxGroup } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../common/reducers";
import { LocationCheckbox } from "./LocationCheckbox";

const LOCATION_LIST = [
  "서울",
  "경기/인천",
  "충청/대전",
  "전라/광주",
  "경북/대구",
  "경남/부산/울산",
  "강원",
  "제주",
];

export default function CategoryBar() {
  const { selectedCategories } = useSelector(
    (state: RootState) => state.festivalData
  );
  
  const locationButtonsList = LOCATION_LIST.map((location) => {
    const locationArray = location.split("/");
    const isChecked = selectedCategories!.some((c) => locationArray.includes(c));
    return <LocationCheckbox key={location} location={location} isChecked={isChecked}/>;
  });

  return (
    <Center marginTop="30px" boxShadow="0 0 15px rgb(0 0 0 / 15%)" bgColor="white">
      <Flex
        flexFlow="row wrap"
        justifyContent="space-between"
        width="75%"
        paddingY="20px"
      >
        <CheckboxGroup>{locationButtonsList}</CheckboxGroup>
      </Flex>
    </Center>
  );
}
