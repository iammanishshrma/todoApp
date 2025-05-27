type ConfirmBoxProps = {
    isOpen: boolean;
    setIsOpen: (show: boolean) => void;
    title: string;
    description: string;
    buttonTitle?: string;
    onConfirm?: () => void;
};
