import { useDispatch } from "react-redux";
import { festivalDataReducer } from "../../common/reducers/festivalDataReducer";

import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

export const LocationCheckbox = (props: { location: string }) => {
  const location = props.location;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  function handleLocationButtonClick(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.value;
    if (isChecked) {
      dispatch(festivalDataReducer.actions.addSelectedCategories(target));
    } else {
      dispatch(festivalDataReducer.actions.deleteSelectedCategories(target));
    }
    dispatch(festivalDataReducer.actions.filterLocation());
    setIsChecked(!isChecked);
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
      {location}
    </Checkbox>
  );
};
