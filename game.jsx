let ref_copy;

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display_mode: 1
        };
    }
    handleClickCopy(){
        ref_copy = this;
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleClickCopy()}>copy reference(press me first)</button>
                {this.state.display_mode == 1 ? <GameEnterPage/> : <></>}
                {this.state.display_mode == 2 ? <GamePlayPage/> : <></>}
                {this.state.display_mode == 3 ? <GameResultPage/> : <></>}
            </>
        );
    }
}


class GameEnterPage extends React.Component{
    handleClickPlay(){
        // need to determine play setting before enter game
        ref_copy.setState({display_mode: 2});
    }

    render(){
        return(
            <div>
                <h2>GameEnterPage</h2>
                <p>need to check account</p>
                <button>My Profile (not complete)</button>
                <button onClick={() => this.handleClickPlay()}>Play Game</button>
            </div>
        );
    }
}


class GamePlayPage extends React.Component{
    handleClickBack(){
        ref_copy.setState({display_mode: 1});
    }

    handleGameOver(){
        ref_copy.setState({display_mode: 3});
    }

    render(){
        return(
            <div>
                <h2>GamePlayPage</h2>
                <button onClick={() => this.handleClickBack()}>Quit Game</button>
                <button onClick={() => this.handleGameOver()}>End Game</button>
                <canvas id="unknownsheet"></canvas>

            </div>
        );
    }
}


class GameResultPage extends React.Component{
    handleClickBack(){
        ref_copy.setState({display_mode: 1});
    }

    render(){
        return(
            <div>
                <h2>GameResultPage</h2>
                <button onClick={() => this.handleClickBack()}>Return to Homepage</button>
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.querySelector("#app"));

/*
 style={
                    {
                        border: '5 px solid black',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                    }
                }

*/