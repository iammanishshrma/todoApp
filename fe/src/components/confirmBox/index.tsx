import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const ConfirmBox = ({
    title,
    description,
    isOpen,
    setIsOpen,
    onConfirm,
    buttonTitle = "Confirm",
}: ConfirmBoxProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {onConfirm && (
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="font-bold"
                        >
                            {buttonTitle}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmBox;
