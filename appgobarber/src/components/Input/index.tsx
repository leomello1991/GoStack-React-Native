// useImperativeHandle serve para passar as função  de filho para pai
// quando passamos de pai para filho usamos as propridade ex: funçao de useEffect dentro do input pegando os valores e setando

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// sempre que precisar usar a ref precisa mudar o tipo do REACT para esse abaixo.. ou seja sempre que precisar usar a Ref como paramentro no imput precisa mudar que neste caso foi usada para alterar o campo que para o proximo
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  // registrando no unform
  useEffect(() => {
    // propriedades
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // setValue(ref: any, value) {
      //   inputValueRef.current.value = value;
      //   inputElementRef.current.setNativeProps({ text: value });
      // },
      // clearValue() {
      //   inputValueRef.current.value = '';
      //   inputElementRef.current.clear();
      // },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        // usar 2 ref ´precisa de hook useImperativeHandle
        ref={inputElementRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
