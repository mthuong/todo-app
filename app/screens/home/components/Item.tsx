import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ItemModel } from '../../../models/item.model';
import { Row, FlexibleView, IconButton, TextButton } from '../../../components';

interface ItemProps {
  item: ItemModel
  onPressItem: (id: number) => void
  onPressDelete: (id: number) => void
}

export default class Item extends React.Component<ItemProps> {
  _onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };

  _onPressDelete = () => {
    this.props.onPressDelete(this.props.item.id);
  }

  render() {
    const { item } = this.props;
    return (
      <Row style={styles.container}>
        <TouchableOpacity
          onPress={this._onPress}
          style={styles.button}>
          <Text style={[styles.text]}>{this.props.item.title}</Text>
        </TouchableOpacity>
        {item.isCompleted && (<Text>Completed   </Text>)}
        <TextButton text='Delete' onPress={this._onPressDelete} />
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    paddingVertical: 10,
    color: 'black'
  }
})