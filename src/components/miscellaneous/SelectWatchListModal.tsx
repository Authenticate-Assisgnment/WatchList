import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState, useMyDispatch } from "../../main";
import { addToSelectedWatchlist } from "../../services/movieAction";
type PropType = {
  isOpen: any;
  onClose: any;
};
const SelectWatchListModal = ({ isOpen, onClose }: PropType) => {
  const { watchlists } = useSelector((state: rootState) => state.watchlist);
  const { selectedVideo } = useSelector((state: rootState) => state.video);
  const { user } = useSelector((state: rootState) => state.user);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useMyDispatch();

  const handleValueChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  async function addToWatchList() {
    dispatch(
      addToSelectedWatchlist(user, selectedValue, selectedVideo, onClose)
    );
  }
  useEffect(() => {
    selectedValue.length > 0 && addToWatchList();
  }, [selectedValue]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select WatchList</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder="Select option" onChange={handleValueChange}>
              {watchlists?.map((watchlist) => (
                <option key={watchlist.id} value={watchlist.id}>
                  {watchlist.title}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectWatchListModal;
