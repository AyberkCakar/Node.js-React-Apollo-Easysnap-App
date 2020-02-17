import React, {Component} from 'react';
import SnapListItem from "../Home/SnapListItem";

class SnapWrapper extends Component {
    componentDidMount() {
        this.props.subscribeToNewSnaps();
    }

    render() {
        const { data } = this.props;

        return (
            <div>
                <ul className="snaps">
                    {
                        data.snaps.map(snap =>snap.user.id === this.props.session.activeUser.id ?  (
                            <SnapListItem key={snap.id}  snap={snap} />
                        ) : '')
                    }
                </ul>

                <div className="counter">{data.snaps.length} snap(s)</div>
            </div>
        );
    }
}

export default SnapWrapper;