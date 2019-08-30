import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MovieModel } from '../../../models';
import { FlexibleView } from '../../../components';

interface MovieProps {
  item: MovieModel
}

export default class MovieComponent extends React.Component<MovieProps, any> {
  constructor(props: MovieProps) {
    super(props);
  }

  public render() {
    const { item } = this.props;
    return (
      <FlexibleView style={{
        padding: 5,
      }}>
        <Text>{item.id}</Text>
        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <Text>{item.overview}</Text>
      </FlexibleView>
    );
  }
}
