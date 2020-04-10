import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme';

export default class City extends Component {
    static navigationOptions = (props) => {
        const { city } = props.navigation.state.params
        return {
            title: city.city,
            headerTitle: {
                color: 'white',
                fontSize: 20,
                fontWeight: '400'
            }
        }
    }

    state = {
        name: '',
        info: ''
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    addLocation = () => {
        if (this.state.name === '' || this.state.info === '') return
        const { city } = this.props.navigation.state.param
        const location = {
            name: this.state.name,
            info: this.state.info
        }
        this.props.screenProps.addLocation(location, city)
        this.setState({
            name: '',
            info: ''
        })
    }
    render() {
        const { city } = this.props.navigation.state.params
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={[!city.locations.length && { flex: 1 }]}>
                    <View style={[styles.locationsContainer, !city.locations.length && { flex: 1, justifyContent: 'center' }]}>
                        {!city.locations.length && <CenterMessage message='No locations for this city' />}
                        {city.locations.map((location, index) => {
                            <View key={index} style={styles.locationContainer}>
                                <Text style={styles.locationName}>{location.name}</Text>
                                <Text style={styles.locationInfo}>{location.info}</Text>
                            </View>
                        })}
                    </View>
                </ScrollView>
                <TextInput
                    onChangeText={val => this.onChangeText('name', val)}
                    placeholder='Location name'
                    value={this.state.name}
                    style={styles.input}
                    placeholderTextColor='white'
                />
                <TextInput
                    onChangeText={val => this.onChangeText('info', val)}
                    placeholder='Location info'
                    value={this.state.info}
                    style={styles.input}
                    placeholderTextColor='white'
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.addLocation}>
                        <View style={styles.button}><Text style={styles.buttonText}>Add Location</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
