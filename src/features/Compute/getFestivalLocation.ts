import { Items } from "../../common/Interface/festivalDataInterface";

export default function getFestivalLocation(item: Items) {
  const location = item.rdnmadr.substring(0, 2);
  if (location.length === 0) {
    return item.lnmadr.substring(0, 2);
  }
  return location;
}