import { Button } from "@chakra-ui/react";

const DeleteWishItemButton = ({
  onDelete,
  index,
}: {
  onDelete: any;
  index: number;
}) => {
  return <Button onClick={onDelete(index)}>삭제</Button>;
};

export default DeleteWishItemButton;
