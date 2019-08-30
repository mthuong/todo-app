import * as React from 'react';
import { View, StyleSheet, Text, FlatList, TextInput } from 'react-native';
import { FlexibleView, Row } from '../../components';
import { httpService } from '../../services';
import { Colors } from '../../themes';
import { MovieModel } from '../../models';
import MovieComponent from './components/Movie';

interface MovieProps {
}

interface MovieState {
  movies: MovieModel[]
}

export class MovieScreen extends React.PureComponent<MovieProps, MovieState> {
  constructor(props: MovieProps) {
    super(props);
    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    // Get movies list here
    try {
      const results = await httpService.requestArray(MovieModel, {
        path: '/movie/popular',
        method: 'GET',
      })
      this.setState({
        movies: results
      })
    } catch (error) {
      console.log(error);
    }
  }

  _keyExtractor = (item: MovieModel, index: number) => `${item.id}` + index;

  _renderItem = ({ item }: { item: MovieModel }) => (
    <MovieComponent
      // key={`${item.id}`}
      item={item}
    />
  );

  render() {
    const { movies } = this.state;
    console.log(movies.length)
    return (
      <FlatList
        initialNumToRender={20}
        style={styles.flatlist}
        data={movies}
        extraData={this.state.movies}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textColor,
    marginHorizontal: 20
  },
  flatlist: {
    // flex: 1,
    // width: '100%'
  },
  search: {
    flex: 1,
    fontSize: 16,
    color: Colors.textColor,
    marginHorizontal: 20,
    height: 40
  },
  button: {
    height: 40,
    margin: 20
  }
})