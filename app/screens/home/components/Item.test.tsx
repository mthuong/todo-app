import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Item from './Item';
import { ItemModel } from '../../../models';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const item = new ItemModel(1, 'Title item', false, false)
      const component = shallow(<Item item={item} onPressItem={() => {}} onPressDelete={() => {}} />)
      expect(component).toMatchSnapshot('Item snapshot')
    })
  })
})