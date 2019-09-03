import React from "react";
import { TouchableOpacity, StyleProp, Text } from "react-native";

interface Props extends StyleProp<any> {
  text: string;
  onPress?(): void;
}

export class TextButton extends React.PureComponent<Props> {
  render() {
    const { onPress, text, style, textStyle } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress && onPress()}
        activeOpacity={0.5}
        css={style}
      >
        <Text css={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
