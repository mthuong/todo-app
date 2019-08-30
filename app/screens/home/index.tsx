import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Item from './components/Item';
import { ItemModel } from '../../models/item.model';
import { FlexibleView, TextButton, Row } from '../../components';
import { Colors } from '../../themes';

export interface HomeProps {
}

interface State {
  value: string
  data: ItemModel[]
  searchData: ItemModel[]
  searchText: string
}

export class HomeScreen extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props);
    // this._onChangeText = this._onChangeText.bind(this)
    // this._onChangeTextSearch = this._onChangeTextSearch.bind(this)
  }

  state = {
    value: '',
    data: (new Array<ItemModel>()),
    searchData: (new Array<ItemModel>()),
    searchText: ''
  };

  _keyExtractor = (item: ItemModel, index: number) => `${item.id}`;

  _onPressItem = (id: number) => {
    const { data } = this.state
    const index = data.findIndex(i => i.id === id)
    const item = data[index]
    item.isCompleted = true
    this.setState({
      data: data
    })
  };

  _onPressDelete = (id: number) => {
    const { data } = this.state
    const index = data.findIndex(i => i.id === id)
    data.splice(index, 1)
    this.setState({
      data: data
    })
  }

  _renderItem = ({ item }: { item: ItemModel }) => (
    <Item
      item={item}
      onPressItem={this._onPressItem}
      onPressDelete={this._onPressDelete}
    />
  );

  render() {
    const { value, searchText, data, searchData } = this.state
    // const items = (searchText && searchText.length > 0) ? searchData : data
    return (
      <FlexibleView style={styles.container}>
        <Row>
          <TextInput
            value={searchText}
            onChangeText={this._onChangeTextSearch}
            placeholder='Search todo'
            placeholderTextColor={Colors.secondaryTextColor}
            style={styles.search}
            returnKeyType='search'
            onSubmitEditing={this._onSearch}
          />
        </Row>
        <Row>
          <TextInput
            value={value}
            onChangeText={this._onChangeText}
            placeholder='New todo'
            placeholderTextColor={Colors.secondaryTextColor}
            style={styles.input}
          />
          <TextButton
            text='Add'
            onPress={this._onAddTodo}
            style={styles.add}
          />
        </Row>

        <FlatList
          style={styles.flatlist}
          data={searchData}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </FlexibleView>
    );
  }

  _onAddTodo = () => {
    const { value } = this.state;
    const newData = [
      new ItemModel(this.state.data.length + 1, `${value}`),
      ...this.state.data,
    ]
    // Add todo
    this.setState({
      data: newData,
      value: ''
    }, () => {
      this._onSearch()
    })

  }

  _onChangeText = (value: string) => {
    this.setState({
      value: value
    })
  }

  _onChangeTextSearch = (value: string) => {
    this.setState({
      searchText: value
    })
  }

  _onSearch = () => {
    const { searchText, data } = this.state
    const results = data.filter(i => i.title.toLowerCase().includes(searchText.toLowerCase()))
    this.setState({
      searchData: results
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  add: {
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textColor,
    marginHorizontal: 20
  },
  flatlist: {
    flex: 1,
    width: '100%'
  },
  search: {
    flex: 1,
    fontSize: 16,
    color: Colors.textColor,
    marginHorizontal: 20,
    height: 40
  }
})