import React, {Component} from 'react';

import  { Query , Mutation} from 'react-apollo';
import {GET_SNAPS , ADD_SNAP} from '../../queries/index';
import TimeAgo from 'react-timeago';

class Home extends Component{

    state = {
        text: '',
        user_id: ''
    };

    onChange = e => {
        this.setState({
           [e.target.name]: e.target.value
        });
    };

    formValidate = () => {
        const { text } = this.state;

        return !text;
    };

    componentDidMount(){
        const { session } = this.props;

        if(session && session.activeUser){
            this.setState({
                user_id: session.activeUser.id
            });
        }
    }

    onSubmit = (e, addSnap) => {
        e.preventDefault();

        if (! this.formValidate()){
            addSnap().then(({ data }) => {
                this.setState({
                    text: ''
                })
            })
        }
    };

    render(){
        const { session } = this.props;
        return(
            <div>
                <div className="description">
                    <p className="sub_header__desc">simple snap app with <span>react</span>.</p>
                </div>

                <div>
                    <Mutation
                        mutation={ADD_SNAP}
                        variables={ { ...this.state } }
                        refetchQueries = {[{ query: GET_SNAPS }]}
                    >
                        {
                            (addSnap, {loading ,error}) => (
                                <form
                                    onSubmit={ e => {
                                        this.onSubmit( e, addSnap );
                                    }}
                                >
                                    <input
                                        className="add-snap__input"
                                        type="text"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        disabled={!( session && session.activeUser )  || loading}
                                        placeholder={ session && session.activeUser ? 'add snap' : 'please login for add a new snap!' }/>
                                </form>
                            )
                        }
                    </Mutation>
                </div>
                <div>
                    <Query query={GET_SNAPS}>
                        {
                            ({ data, loading, error }) => {
                                if (loading) return <div className="loading">Loading Snaps...</div>;
                                if (error) return <div>Error...</div>;

                                return (
                                    <div>
                                        <ul className="snaps">
                                            {
                                                data.snaps.map(snap => (
                                                    <li key={snap.id}>
                                                        <div className="title">
                                                            <span className="username">@{ snap.user.username }  </span>
                                                            { snap.text }
                                                        </div>
                                                        <div className="date">
                                                        <span>
                                                            <TimeAgo date={snap.createdAt}/>
                                                        </span>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="counter">{ data.snaps.length } snap(s)</div>
                                    </div>
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        );
    };
}

export default Home;