import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const headers = {
  "content-type": "application/json",
  Authorization: "Bearer " + cookies.get("token"),
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const notify = (alert) => {
  toast.error(alert, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifySuccess = (
  redirectTo,
  header,
  body1,
  body2,
  ...otherBodies
) => {
  toast.success(
    <>
      <strong>{header}</strong>
      <br />
      {body1}
      <br />
      {body2}
      {otherBodies.map((body) => (
        <>
          <br />
          {body}
        </>
      ))}
    </>,
    {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      onClose: () => window.location.replace(redirectTo),
      className: "custom-success-toast",
    }
  );
};
