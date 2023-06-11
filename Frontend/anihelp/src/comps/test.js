import React, {Component} from "react";

class Test extends Component{
    state = {
        user:"Guest"
    }
    userInput =React.createRef();
    changeName=()=>{
        // alert(this.userInput.current.value)
        //this.setState({user:this.userInput.current.value})
        this.props.user(this.refs.id_input.value)
    }
    render(){
        return(
            <div>
                <h2>Welcome : { this.changeName}</h2>
                <h1>Enter your name:</h1>
                <input ref="id_input" type="text" defaultValue=""></input>
                <button onClick={this.changeName}>change name</button>
            </div>
        )
    }
}

export default Test;