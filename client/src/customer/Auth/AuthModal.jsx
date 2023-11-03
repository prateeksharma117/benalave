import { Modal, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RegisterForm, LoginForm } from "../Auth";
import { useLocation } from "react-router-dom";

const AuthModal = ({ opened, close ,menuClose}) => {
  const location = new useLocation();

  return (
    <>
      <div>
        <MantineProvider>
          <Modal
            opened={opened}
            onClose={close}
            title="Authentication"
            centered
          >
            {location.pathname === "/login" ? <LoginForm close={close} menuClose={menuClose} /> : <RegisterForm close={close} menuClose={menuClose}/>}
          </Modal>
        </MantineProvider>
      </div>
    </>
  );
};

export default AuthModal;
