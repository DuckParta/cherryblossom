import { useDispatch } from "react-redux";
import { festivalDataReducer } from "../features/reducers/festivalDataReducer";

export default function CategoryBar() {
  const dispatch = useDispatch();
  const LOCATION_LIST = ["서울", "경기/인천", "충청/대전", "전라/광주", "경북/대구", "경남/부산/울산", "강원", "제주"];
  const locationButtonsList = LOCATION_LIST.map((location) => {
    return (
      <div key={location}>
        <button value={location}
        onClick={handleLocationButtonClick}
        >{location}</button>
      </div>
    )
  });

  function handleLocationButtonClick(e: any) {
    const target = e.target.value
    dispatch(festivalDataReducer.actions.filterLocation(target));

  }
  return (
    <>
    <div>
      {locationButtonsList}
    </div>
    </>
  )
}