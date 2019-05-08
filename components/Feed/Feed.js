import React from 'react';
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { FlatList, StyleSheet, RefreshControl, View, Text } from 'react-native';

import Item from './Thumbnail.js';
import ItemNGO from './ThumbnailNGO.js'


class ItemList extends React.Component {
    constructor(props) {
    super(props);
  }

  renderFooter({ items }) {
      if(items && items.length > 0) { return null }

      return (
          <View style={{justifyContent:'center', alignItems: 'center'}} >
            <Text style={{color: 'white', fontSize: 17}}>No donations to show</Text>
          </View>
      )
  }

    render() {
        return (
            <FlatList
            style={styles.listContainer}
            data={this.props.items.reverse()}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter(this.props)}
            refreshControl = {
                <RefreshControl
                    refreshing = {this.props.isLoading}
                    onRefresh = {this.props.onRefresh}
                    tintColor="#fff"
                    titleColor="#fff"
                />
            }
            renderItem={(info) => {
                if(this.props.isDonor) {
                    return (
                        <Item
                        itemCategory={info.item.categories[0]}
                        DonatedImage={info.item.image}
                        itemDate={info.item.dateAdded}
                        itemdesc={info.item.description}
                        itemstatus={info.item.status}
                        onPress={() => this.props.onPress(info.item.id)}
                        />
                    )
                } else {

                    if (this.props.is_approved === undefined) {
                        is_app = false
                    } else {
                        is_app = true
                    }

                    return (
                        <ItemNGO
                            is_approved = {is_app}
                            itemCategory = {info.item.categories[0]}
                            DonatedImage = {info.item.image}
                            itemLocation = {info.item.location}
                            itemdesc = {info.item.description}
                            itemAddress = {info.item.collection_address}
                            itemid = {info.item.id}
                            onPress = {() => this.props.onPress(info.item.id)}
                        />
                    )
                }

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


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isDonor: state.auth.isDonor
    }
}



export default connect(mapStateToProps, null)(ItemList);