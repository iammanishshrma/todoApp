import { Bounce, toast, type ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
};

const errorToast = (message: string) => {
    toast.error(message, {
        ...toastConfig,
        toastId: "error-toast",
    });
};

const successToast = (message: string) => {
    toast.success(message, {
        ...toastConfig,
        toastId: "success-toast",
    });
};

const infoToast = (message: string) => {
    toast.info(message, {
        ...toastConfig,
        toastId: "info-toast",
    });
};

export { errorToast, successToast, infoToast };
