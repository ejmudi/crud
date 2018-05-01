import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionTypeEnum } from "./../enums/actionTypeEnum";
import { fetchAllData } from "./../actions/thunkActions";
import { handleUpdatePostTitle } from "./../actions/index";
import { handleDeleteItem } from "./../actions/index";

export interface post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface album {
    id: number;
    title: string;
    userId: number
}

export interface user {
    id: number;
    name: string;
}

export class item {
    post: post;
    album: album;
    user: user;
}

interface IReduxState {
    posts?: Array<post>;
    albums?: Array<album>;
    users?: Array<user>;
    items?: Array<item>;
    itemsInEditMode?: Array<number>;
}

interface IIndexProps {
    items?: Array<item>;
    handleDeleteItem?(itemIndex: number): void;
    handleUpdatePostTitle?(itemIndex: number, newPostTitle: string): void;
    fetchData?(url: string, actionTypeEnum: number): JQueryPromise<{}>;
    fetchAllData(): any;
}

interface IIndexState {
    itemsInEditMode: Array<number>;
}

class IndexComponent extends React.Component<IIndexProps, IIndexState> {

    constructor(props: IIndexProps) {
        super(props);

        this.state = {
            itemsInEditMode: new Array<number>()
        };
    }

    componentDidMount() {
        this.props.fetchAllData();
    }

    itemIsInEditMode(item: item): boolean {
        return this.state.itemsInEditMode.some(x => x === item.post.id);
    }

    handleActivateEditMode(item: item): void {
        const itemsInEditMode = [...this.state.itemsInEditMode, item.post.id]

        this.setState({
            itemsInEditMode
        });
    }

    handleDeactivateEditMode(item: item): void {
        this.setState({
            itemsInEditMode: this.state.itemsInEditMode.filter(x => x !== item.post.id)
        });
    }

    render() {

        return (
            <div>
                <table>
                    {
                        <thead>
                            <tr>
                                {
                                    new Array("", "Post title", "Album title", "User name", "").map((th, i) =>
                                        <th key={i}>
                                            {th}
                                        </th>
                                    )
                                }
                            </tr>
                        </thead>
                    }
                    <tbody>
                        {
                            this.props.items.map((item, i) =>
                                <tr key={i}>
                                    {
                                        new Array<number | string | JSX.Element>(
                                            i + 1,
                                            this.itemIsInEditMode(item)
                                                ? <input type="text" value={item.post.title} onChange={(e) => this.props.handleUpdatePostTitle(i, e.target.value)} />
                                                : item.post.title,
                                            item.album.title,
                                            item.user.name,
                                            <div>
                                                {
                                                    this.itemIsInEditMode(item) && <button onClick={() => this.handleDeactivateEditMode(item)}>Save</button>
                                                }
                                                {
                                                    !this.itemIsInEditMode(item) && <button onClick={() => this.handleActivateEditMode(item)}>Edit</button>
                                                }
                                                <button onClick={() => this.props.handleDeleteItem(i)}>Delete</button>
                                            </div>
                                        ).map((x, ii) =>
                                            <td key={ii}>
                                                {x}
                                            </td>)
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

//used to attach state values to props
const mapStateToProps = ({posts, albums, users, items, itemsInEditMode}: IReduxState) => {

    return {
        items
    };
}

//used to attach actionCreators to props
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
                fetchAllData,
        handleUpdatePostTitle,
                handleDeleteItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent);