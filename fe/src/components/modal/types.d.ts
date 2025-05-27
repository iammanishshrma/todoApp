type ModalProps = {
    title?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: ReactElement;
};
