import React from 'react';
import Manager from './manager.jsx';
import EditManager from './edit_managers.jsx';

// TODO: refactor edit and show page, lot's of duplicate code
// CSS is duplicated also
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      managerList: {
        1: {
          id: 1,
          name: "Warren Fisher, CFA",
          body: "A large body of text"
        },
        2: {
          id: 2,
          name: "John F. Kennedy, POTUS",
          body: "Some cools facts about potus"
        }
      },
      displayEdit: false
    };

    this.showEdit = this.showEdit.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
    this.save = this.save.bind(this);
  }

  showEdit() {
    this.setState({displayEdit: true});
  }

  hideEdit() {
    this.setState({displayEdit: false});
  }

  save(changedManagers) {
    return () => {
      // debugger
      this.setState({
        managerList: changedManagers,
        displayEdit: false
      });
    };
  }

  render() {

    const editManager = this.state.displayEdit ? 
      <EditManager 
        managerList={this.state.managerList}
        hideEdit={this.hideEdit}
        save={this.save}
        /> : 
      null;

    const managerList = Object.keys(this.state.managerList).map( managerId => {
      return <Manager manager={this.state.managerList[managerId]} key={managerId} />;
    });

    return (
      <section className="main-event-wrapper">
        <section className="main-event">
          <section className="main-header">
            <h2>Executive Management</h2>
            <button
              onClick={this.showEdit}>
              <img src="./public/images/pencil.svg" />
              Edit
            </button>
          </section>
          {managerList}
        </section>
        {editManager}
      </section>
    );
  }
}

export default App;