import React from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

import { Container } from "./styles";
import Toast from "./Toast";
import { ToastMessage } from "../../hooks/toast";

interface ToastContainerProps {
  message: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ message }) => {
  return (
    <Container>
      {message.map((message) => {
        <Toast key={message.id} message={message} />;
      })}
    </Container>
  );
};

export default ToastContainer;
