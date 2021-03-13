import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Container, Content, Background } from "./style";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import Logo from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import getValidationErros from "../../utils/getValidationErros";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

interface SignInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite e-mail válido"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Ocorrreu um erro ao fazer login",
        });
      }
    },
    [signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Login</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Login</Button>
          <a href="es">Esqueci minha senha</a>
        </Form>
        <a href="es">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SingIn;
