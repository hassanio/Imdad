import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Item from './Thumbnail.js';

class ItemList extends React.Component {
    constructor(props) {
    super(props);
  }

    render() {
        return (
            <FlatList
            style={styles.listContainer}
            data={this.props.items}
            renderItem={(info) => {

                return (
                    <Item
                    itemCategory={info.item.categories[0]}
                    DonatedImage={info.item.image}
                    itemDate={info.item.dateAdded}
                    itemdesc={info.item.description}
                        //onItemPressed={() => alert("Item: " + key)}
                    />
                )

            }
                }
            />

        );
    }  
        

}

const styles = StyleSheet.create({
        listContainer: {
          width: '100%'
        }
});


export default ItemList;