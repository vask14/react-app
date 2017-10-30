import React from 'react';
import ReactDOM from 'react-dom';


const Card = (props) => {
    return (
        <div style = {{marginTop:"20px",padding:"10px",width:"30%"}}>
            <img src = {props.avatar_url} style = {{width:"100px",height:"100px"}}/>
            <div style={{display:"inline-block",paddingLeft:"10px"}}>
                <div>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(function(el){
                return <Card key = {el.id} {...el} />
            })}
        </div>
    );
};


class Form extends React.Component {
    state = {userName: ''}
    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
          .then(resp => {
              this.props.onSubmit(resp.data);
              this.setState({userName: ''});
          });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type = "text" 
                value = {this.state.userName}
                onChange = {(event) => this.setState({userName: event.target.value})}
                placeholder = "Github username" required/>
                <button type = 'submit'>Add Card</button>
            </form>
        );
    }
};


class App extends React.Component {
    state = {
        cards: []
    };
    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };
    render() {
        return(
        <div>
            <Form onSubmit={this.addNewCard}/>
            <CardList cards = {this.state.cards}/>
        </div>
        );
    }
};



ReactDOM.render(<App />,document.getElementById('root'));
