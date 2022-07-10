import { Box } from "@chakra-ui/react";
import { WishIcon, WishActiveIcon } from "../../assets/svgs";

export const AddWishListButton = ({ isWish, onAdd }: any) => {
  return (
    <Box cursor="pointer">
      {isWish ? (
        <WishActiveIcon onClick={onAdd} width="35px" height="35px" />
      ) : (
        <WishIcon onClick={onAdd} width="35px" height="35px" />
      )}
    </Box>
  );
};
