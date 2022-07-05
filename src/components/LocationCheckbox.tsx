import { useDispatch } from "react-redux";
import { festivalDataReducer } from "../reducers/festivalDataReducer";

import { Checkbox, Heading } from "@chakra-ui/react";

export const LocationCheckbox = (props: {
  location: string;
  isChecked: boolean;
}) => {
  const { location, isChecked } = props;
  const dispatch = useDispatch();

  function handleLocationButtonClick(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.value;
    if (!isChecked) {
      dispatch(festivalDataReducer.actions.addSelectedCategories(target));
    } else {
      dispatch(festivalDataReducer.actions.deleteSelectedCategories(target));
    }
  }

  return (
    <Checkbox
      value={location}
      onChange={handleLocationButtonClick}
      isChecked={isChecked}
      margin="10px"
      padding="10px"
      bgColor="transparent"
      fontSize="lg"
    >
      <Heading size="sm" fontWeight="semibold">
        {location}
      </Heading>
    </Checkbox>
  );
};
