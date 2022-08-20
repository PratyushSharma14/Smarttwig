import React, { Component, useState} from 'react'
import axios from 'axios'


export class Pingpong extends Component {
    constructor(props){
        super(props)
        this.state = {Playername: "", Opponentname: "", Server: "", playerScore: 0, opponentScore: 0, winner: ""}
        this.handleClick = this.handleClick.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
        this.changer = this.changer.bind(this)
    }
    handleClick(){
        this.setState({playerScore: this.state.playerScore + 1})
        if (this.state.Server === this.state.Playername){
            this.setState({Server: this.state.Opponentname}) 
        }
        else{
            this.setState({Server: this.state.Playername}) 
        }
        if (this.state.playerScore == 10 && this.state.opponentScore < 10){
            this.setState({winner: this.state.Playername, points: this.state.playerScore+1})
        }
        else if (this.state.playerScore >= 10 && this.state.opponentScore >= 10 && this.state.playerScore ==  this.state.opponentScore+1){
            this.setState({winner: this.state.Playername, points: this.state.playerScore+1})
        }
    }
    handleClick2(){
        this.setState({opponentScore: this.state.opponentScore + 1})
        if (this.state.Server === this.state.Playername){
            this.setState({Server: this.state.Opponentname}) 
        }
        else{
            this.setState({Server: this.state.Playername}) 
        }
        if (this.state.opponentScore == 10 && this.state.playerScore < 10){
            this.setState({winner: this.state.Opponentname, points: this.state.opponentScore+1})
        }
        else if (this.state.opponentScore >= 10 && this.state.playerScore >= 10 && this.state.opponentScore ==  this.state.playerScore+1){
            this.setState({winner: this.state.Opponentname, points: this.state.opponentScore+1})
        }
    }
    changer(){
        this.setState({Server: this.state.Server}) 
        this.setState({winner: ""})
        this.setState({playerScore: 0})
        this.setState({opponentScore: 0})
        
    }
    changeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    submitHandler = (e) => {
        e.preventDefault()
        //var msg = {winner: this.state.Playername, points: this.state.playerScore};
        console.log(this.state)
        axios.post("http://localhost:3001/user", this.state)
        .then(response =>
            {
                console.log(response)
            }
        )
    }

    render() {
        const {Playername, Opponentname, Server}  = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="Playername" value={Playername} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="Opponentname" value={Opponentname} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="Server" value={Server} onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>
                    <p style={{fontSize: "20px"}}>Server is {Server}</p>
                </form>
                <p style={{fontSize: "25px"}}>Winner is {this.state.winner}</p>
                <p style={{color:"green"}}>Player1 is {this.state.Playername} and his score is {this.state.playerScore}</p>
                <p style={{color:"red"}}>Player2 is {this.state.Opponentname} and his score is {this.state.opponentScore}</p>
                <button onClick={(this.handleClick)}>+1 [Player1]</button>
                <button onClick={(this.handleClick2)}>+1 [Player2]</button>
                <div>
                    <button onClick={(this.changer)}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Pingpong