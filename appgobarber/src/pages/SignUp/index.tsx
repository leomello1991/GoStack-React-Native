import React, { useRef, useCallback } from 'react';

import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSignUp = useCallback((data: object) => {
    console.log(data);
  }, []);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image
              source={logImg}
              // style={{
              //   alignItems: 'center',
              //   alignContent: 'center',
              //   marginTop: 15,
              // }}
            />

            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                textContentType="newPassword"
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastre seu usuario
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para Logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
