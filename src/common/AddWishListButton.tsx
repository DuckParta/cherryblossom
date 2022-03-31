import { Image } from "@chakra-ui/react";

export const AddWishListButton = ({ isWish, onAdd }: any) => {
  return (
    <div>
      {isWish ? (
        <Image
          src={`${process.env.PUBLIC_URL}/images/wish_active_icon.png`}
          w="30px"
          alt="wish"
          onClick={onAdd}
          cursor="pointer"
        />
      ) : (
        <Image
          src={`${process.env.PUBLIC_URL}/images/wish_icon.png`}
          w="30px"
          alt="wish"
          onClick={onAdd}
          cursor="pointer"
        />
      )}
    </div>
  );
};
