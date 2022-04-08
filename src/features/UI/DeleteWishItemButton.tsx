import { Button } from "@chakra-ui/react";

export default function DeleteWishItemButton (props: {onDelete: any, index: number}) {
    const {onDelete, index} = props;

    return (
      <Button onClick={onDelete(index)}>삭제</Button>
    )
  } 
