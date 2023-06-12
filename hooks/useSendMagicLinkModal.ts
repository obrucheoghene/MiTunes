import {create} from "zustand"

interface SendMagicLinkModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSendMagicLinkModal = create<SendMagicLinkModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useSendMagicLinkModal;
