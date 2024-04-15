import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { rootState, useMyDispatch } from "../../main";
import { createNewWatchlist } from "../../services/watchlistAction";
type PropType = {
  isOpen: any;
  onClose: any;
};
const WatchListModal = ({ isOpen, onClose }: PropType) => {
  const [listTitle, setListTitle] = useState("");
  const { user } = useSelector((state: rootState) => state.user);
  const dispatch = useMyDispatch();
  const createWatchList = async () => {
    let newWatchlist = {
      id: String(Math.round(Math.random() * 10000)),
      title: listTitle,
      movies: [],
    };
    dispatch(createNewWatchlist(user, newWatchlist, onClose));
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create WatchList</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              mb={2}
              placeholder="Enter list name"
              onChange={(e) => setListTitle(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createWatchList}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WatchListModal;
