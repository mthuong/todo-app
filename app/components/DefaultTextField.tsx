import React from 'react';
import { Image, TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components';
import { Row } from '.';
import { TextAlignProperty } from 'csstype';

const Container = styled(Row)`
height: 45px;
align-items: center;
border-radius: 5px;
background-color: #F8F8F8;
`;

const TextField = styled(TextInput) <any>`
flex: 1;
font-size: 15px;
color: #666666;
padding: 0 10px;
`;

const Icon = styled(Image) <any>`
margin-left: 10px;
width:${props => props.iconSize || 30}px;
`;

interface Props extends TextInputProps {
  icon?: any
  iconSize?: number
  iconColor?: string

  textAlign?: "auto" | "left" | "right" | "center" | "justify"
  contentPadding?: string
  fieldCss?: string
}

export class DefaultTextField extends React.Component<Props> {

  static defaultProps = {
    iconColor: 'white',
    textAlign: 'left'
  }

  render() {
    const textFieldProps = { ...this.props };
    delete textFieldProps.style;

    return (
      <Container css={this.props.style as any}>
        {
          this.props.icon && (
            <Icon
              iconSize={this.props.iconSize}
              source={this.props.icon}
              tintColor={this.props.iconColor}
              resizeMode="contain" />
          )
        }
        <TextField
          {...textFieldProps}
          underlineColorAndroid='transparent'
          css={this.props.fieldCss} />
      </Container>
    )
  }
}