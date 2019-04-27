import React from 'react';
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { FlatList, StyleSheet, RefreshControl } from 'react-native';

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
            keyExtractor={(item, index) => index.toString()}
            refreshControl = {
                <RefreshControl
                    refreshing = {this.props.isLoading}
                    onRefresh = {() => this.props.FetchDonations(this.props.token)}
                    tintColor="#fff"
                    titleColor="#fff"
                />
            }
            renderItem={(info) => {
                return (
                    <Item
                    itemCategory={info.item.categories[0]}
                    DonatedImage={info.item.image}
                    itemDate={info.item.dateAdded}
                    itemdesc={info.item.description}
                    onPress={() => this.props.onPress(info.item.id)}
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


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isLoading: state.all_donations.loading
    }
}



export default connect(mapStateToProps, actions)(ItemList);