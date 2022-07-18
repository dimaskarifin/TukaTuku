import {View, Text} from 'react-native';
import React from 'react';
import {CardMenu} from '../../kecil';

const ListMenu = ({menus}) => {
  return (
    <View>
      {menus.map(menu => {
        return <CardMenu menu={menu} key={menu.id} />;
      })}
    </View>
  );
};

export default ListMenu;
