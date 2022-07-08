import { useDispatch } from "react-redux";
import { festivalDataReducer } from "../reducers/festivalDataReducer";

import { Checkbox, Heading } from "@chakra-ui/react";

export const LocationCheckbox = ({
  location,
  isChecked,
}: {
  location: string;
  isChecked: boolean;
}) => {
  const dispatch = useDispatch();

  const handleLocationButtonClick = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target.value;

    if (!isChecked) {
      dispatch(festivalDataReducer.actions.addSelectedCategories(target));
      return;
    }
    dispatch(festivalDataReducer.actions.deleteSelectedCategories(target));
  };

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
