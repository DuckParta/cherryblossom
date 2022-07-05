import { WishActiveIcon, WishIcon } from "../assets/svgs";

const WishListButton = ({ isWish, onAdd }: any) => {
  return (
    <>
      {isWish ? (
        // <Image
        //   src={`${process.env.PUBLIC_URL}/images/wish_active_icon.png`}
        //   w="30px"
        //   alt="wish"
        //   onClick={onAdd}
        //   cursor="pointer"
        // />
        <WishIcon onClick={onAdd} />
      ) : (
        // <Image
        //   src={`${process.env.PUBLIC_URL}/images/wish_icon.png`}
        //   w="30px"
        //   alt="wish"
        //   onClick={onAdd}
        //   cursor="pointer"
        // />
        <WishActiveIcon onClick={onAdd} />
      )}
    </>
  );
};

export default WishListButton;
