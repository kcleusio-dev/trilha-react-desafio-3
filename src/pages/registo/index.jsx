import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPersonAdd, MdPhone } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { useForm } from "react-hook-form";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  Subtitle,
  CriarText,
  Row,
  Wrapper,
} from "./styles";

import { useState } from "react";

const Registo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "onSubmit",
  });

  const [data, setData] = useState();

  const onSubmit = async () => {
    setData(JSON.stringify(data));
    try {
      await api.post(`/users?nomeCompleto=${data.nomeCompleto}&mail=${data.email}&telefone=${data.telefone}&senha=${data.senha}`);
      alert("Usuário criado...");
    } catch (e) {
      alert("Ocorreu um erro...",e);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Crie a sua conta grátis</TitleLogin>
            <SubtitleLogin>Preencha seus dados</SubtitleLogin>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="*Nome Completo"
                leftIcon={<MdPersonAdd />}
                name="nomeCompleto"
                control={control}
              />
              {errors.nomeCompleto && <span>Nome é obrigatório</span>}

              <Input
                placeholder="*Seu melhor E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}

              <Input
                placeholder="+244 923000000"
                leftIcon={<MdPhone />}
                name="telefone"
                control={control}
              />

              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}

              <Button
                title="Criar minha conta"
                variant="secondary"
                type="submit"
              />
              {data}
            </form>

            <Row>
              <Subtitle>
                Ao clicar me "criar minha conta grátis", declaro que aceito as
                Políticas de privacidade e os termos de Uso da DIO.
              </Subtitle>

              <CriarText>Já tenho conta. Fazer login</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Registo };
