import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ElevatedView from 'react-native-elevated-view';

import { hideCard } from '../../actions/cards';
import CardHeader from './CardHeader';

const css = require('../../styles/css');

class Card extends React.Component {
	setNativeProps(props) {
		this._card.setNativeProps(props);
	}

	refresh(refreshType) {
		return;
	}
	_renderMenu = () => {
		// we can hide the menu if we don't want it, like for non-hideable cards
		if (this.props.hideMenu) return;

		return (
			<Menu style={css.card_menu} onSelect={value => this.menuOptionSelected(value)}>
				<MenuTrigger>
					<Icon size={28} style={css.card_menu_trigger} name="md-more" />
				</MenuTrigger>
				<MenuOptions>
					<MenuOption onSelect={() => { this.props.dispatch(hideCard(this.props.id)); }}>
						<Text style={css.card_hide_option}>Hide Card</Text>
					</MenuOption>
					{
						(this.props.cardRefresh) ? (
							<MenuOption onSelect={() => { this.props.cardRefresh() }}>
								<Text style={css.card_hide_option}>Refresh</Text>
							</MenuOption>
						) : (null)
					}
				</MenuOptions>
			</Menu>
		);
	}
	render() {
		return (
			<ElevatedView
				style={styles.card_main}
				ref={(i) => { this._card = i; }}
				elevation={3}
			>
				<CardHeader id={this.props.id} title={this.props.title} menu={this._renderMenu()} />
				{this.props.children}
			</ElevatedView>
		);
	}
}

const styles = StyleSheet.create({
	card_main: { backgroundColor: '#F9F9F9', margin: 6, alignItems: 'flex-start', justifyContent: 'center' },
});

export default connect()(Card);
