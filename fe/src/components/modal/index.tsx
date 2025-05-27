import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const Modal = ({ title, isOpen, setIsOpen, children }: ModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Modal;
