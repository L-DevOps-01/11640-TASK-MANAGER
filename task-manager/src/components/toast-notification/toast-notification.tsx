import { toast } from "react-toastify";

export const ToastNotif = (message: string, type: "success" | "info") => {
  toast[type](message, {
    className: `toast-notif ${type}`,
    position: "top-right",
    closeOnClick: true,
    pauseOnHover: true,
    icon: false,
    draggable: false,
    theme: "dark",

  });
};
