
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 0,
      info : ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.renderF1 = this.renderF1.bind(this)
  }

  handleClick() {
    this.setState({ page: 1 })
  }

  renderF1() {
    fetch('http://127.0.0.1:3000/newUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(success => console.log(success))
    ReactDOM.render(<F1/>, document.getElementById("app"));
  }


  render () {
    return (
      <button onClick={this.renderF1}>Check Out</button>
    )
  }
}

/////////////////////////////////////////////////RENDERS NAME EMAIL PASSWORD NEW ACCOUNT CREATION SCREEN///////////////////////////////
class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.renderF2 = this.renderF2.bind(this)
    this.change = this.change.bind(this)
  }

  change(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  renderF2() {
    fetch('http://127.0.0.1:3000/userName', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(success => console.log(success))
    ReactDOM.render(<F2 customerInfo={this.state}/>, document.getElementById("app"))

  render () {
    return (
      <div style={{width:"10%"}}>
        <div>
          Name:
          <input type="text" id="name" value={this.state.name} onChange={this.change}/>
        </div>
        <div>
          Email:
          <input type="text" id="email" value={this.state.email} onChange={this.change}/>
        </div>
        <div>
          Password:
          <input type="text" id="password" value={this.state.password} onChange={this.change}/>
        </div>
        <button onClick={this.renderF2}>Next</button>
      </div>
    )
  }
}

/////////////////////////////F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number////////////////////////
class F2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: ''
    }
    this.change = this.change.bind(this);
    this.renderF3 = this.renderF3.bind(this);
  }

  change(event) {
    this.setState({[event.target.id]:event.target.value})
  }
  renderF3() {
    fetch('http://127.0.0.1:3000/userAddress', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(success => console.log(success))
    var customerInfo = Object.assign(this.props.customerInfo, this.state)
    ReactDOM.render(<F3 customerInfo={customerInfo}/>, document.getElementById("app"))
  }

  render () {
    return (
      <div>
        <div style={{width:"10%"}}>
          <p>Address</p>
            Line 1:
            <input type="text" id="line1" value={this.state.line1} onChange={this.change}/>
            Line 2:
            <input type="text" id="line2" value={this.state.line2} onChange={this.change}/>
            City:
            <input type="text" id="city" value={this.state.city} onChange={this.change}/>
            State:
            <input type="text" id="state" value={this.state.state} onChange={this.change}/>
            Zip:
            <input type="text" id="zip" value={this.state.zip} onChange={this.change}/>
        </div>
        <button onClick={this.renderF3}>Next</button>
      </div>
    )
  }
}


///////////////////////////////////////F3 collects credit card #, expiry date, CVV, and billing zip code.////////////////////////////////

class F3 extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      ccNumber: '',
      expDate:'',
      CVV:'',
      billing_zip:''
    }
    this.change = this.change.bind(this);
    this.renderConfirmation = this.renderConfirmation.bind(this);
  }

  change(event) {
    this.setState({[event.target.id]: event.target.value})
    console.log(this.state[event.target.id])
  }

  renderConfirmation() {
    fetch('http://127.0.0.1:3000/userPayment', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(success => console.log(success))
    var customerInfo = Object.assign(this.props.customerInfo, this.state)
    var objMap = function(items) {
      var infoList = [];
      for (var i in items) {
        infoList.push(<li>{i} : {items[i]}</li>)
      }
      return infoList;
    }
    var allInfo = objMap(customerInfo)
    ReactDOM.render(<Confirm info={allInfo}/>, document.getElementById("app"))
  }

  render () {
    return (
      <div style={{width:"30%"}}>
      Credit Card Number:
      <input type="text" id="ccNumber" value={this.state.ccNumber} onChange={this.change}/>
      <br/>
      Expiration Date:
      <input type="text" id="expDate" value={this.state.expDate} onChange={this.change}/>
      <br/>
      CVV:
      <input type="text" id="CVV" value={this.state.CVV} onChange={this.change}/>
      <br/>
      Zip:
      <input type="text" id="billing_zip" value={this.state.zip} onChange={this.change}/>
      <br/>
      <button onClick={this.renderConfirmation}>Submit</button>
      </div>
    )
  }
}

function Confirm (props) {
  return (
    <div>
      <h1>This is your info</h1><br/>
      <ul>{props.info}</ul>
    </div>)
}

ReactDOM.render(<App/>, document.getElementById("app"));
