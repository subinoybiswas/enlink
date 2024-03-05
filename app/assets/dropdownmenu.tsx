import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MyDropdownMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button radius="full" variant="faded" isIconOnly aria-label="Like">
          <GiHamburgerMenu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
