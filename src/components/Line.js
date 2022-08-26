import React from "react";
import styled from 'styled-components/native';
import PropTypes  from 'prop-types';
import {Dimensions} from 'react-native';

const StyledTouchableOpacity=styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.itemBackground};
  color: ${({theme}) => theme.text};
  border-radius: 10px;
  padding: 10px 20px;

width: ${({ width }) => width - 40}px;
margin: 10px 0;


`;

const StyledText = styled.Text`
font-size: 20px;
padding: 5px;
font-weight: bold;
color: ${({ theme }) => theme.text};
align-self: center;

`;

const LineButton= ({text, onPressOut})=>{
  const width = Dimensions.get('window').width;

  return(
    <StyledTouchableOpacity onPressOut={onPressOut} width={width} >
      <StyledText>{text}</StyledText>
    </StyledTouchableOpacity>
  );
}

LineButton.defaultProps={
text:'임시',
onPressOut:()=>{}

}

LineButton.protoTypes={
  text  : PropTypes.string.isRequired,
  onPressOut: PropTypes.func.isRequired
}

export default LineButton;