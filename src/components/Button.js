import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';



const ButtonContainer=styled.TouchableOpacity`
 width: ${({ width }) => width - 40}px;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 20px;
  color: ${({theme}) => theme.text};
`

const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  align-self: center;
`

const Button = ()=>{
  const width = Dimensions.get('window').width;
  return(
    <ButtonContainer width={width}  >
      <Title>완료항목 삭제하기</Title>
    </ButtonContainer>
  );
};

export default Button;