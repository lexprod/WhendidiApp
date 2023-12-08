import { FontAwesome } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Text } from 'react-native';

const SortMenu = () => {
   return (
      <Menu style={{ marginRight: 5 }}>
         <MenuTrigger>
            <FontAwesome name="sort" size={30} color={'#777'} />
            <Text style={{ color: '#777' }}>Sort...</Text>
         </MenuTrigger>
         <MenuOptions>
            <MenuOption onSelect={() => alert(`pressed1`)} >
               <Text >Most Days Since</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`pressed2`)} >
               <Text>Least Days Since</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`pressed3`)} >
               <Text>Alphabetical</Text>
            </MenuOption>
         </MenuOptions>
      </Menu>
   )
};

export default SortMenu;