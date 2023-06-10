import {create} from "zustand"

interface SigninModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSigninModal = create<SigninModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useSigninModal;
