import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import GridLayout from './grid/grid.presenter';
import HomepageLayout from './homepage/homepage.presenter';
import FormikRender from './formik/formik.presenter';

// Container
import { connect } from 'react-redux';

class App extends Component {
  state = {
    view: HomepageLayout
  }

  options = [
    { key: 1, text: 'Homepage', value: 'home' },
    { key: 2, text: 'Grid', value: 'grid' },
    { key: 3, text: 'Formik', value: 'formik' },
  ]

  map = {
    home: HomepageLayout,
    grid: GridLayout,
    formik: FormikRender,
  }

  componentDidMount() {
    this.props.getCharacters({
      1: {
        name: 'Superman'
      }
    });
  }

  onChange(event, data) {
    this.setState({ view: this.map[data.value] });
  }

  render() {
    return (
      <div>
        <Menu compact>
          <Dropdown
            text='View'
            options={this.options}
            onChange={this.onChange.bind(this)}
            defaultValue={'home'}
            simple
            item />
        </Menu>
        <this.state.view />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    characters: state.characters
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    getCharacters: (characters) => {
      return dispatch({
        type: 'RECEIVE_CHARACTERS',
        characters
      });
    }
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
