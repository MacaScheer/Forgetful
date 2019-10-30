import React from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import StartDateDetailOption from "./StartDateDetailOption";
import "../stylesheets/showpage_css.scss";

const { UPDATE_TASK_START_DATE } = mutations;

class StartDateDetail extends React.Component {
    constructor(props) {
        super(props);
        // 
        this.state = {
            input: "",
            editing: false,
            picking_date: false,
            datePicked: false,
            start_date: this.props.start_date,
            start_dateId: ""
        };
        this.handleEdit = this.handleEdit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.inputAdder = this.inputAdder.bind(this);
        this.stateBinder = this.stateBinder.bind(this);
        this.toggleOffEditing = this.toggleOffEditing.bind(this);

    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true, pickingDate: true });
    }

    componentWillMount() {
        document.addEventListener("mousedown", this.toggleOffEditing);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.toggleOffEditing);
    }

    toggleOffEditing(e) {
      
        if (this.state.editing && !e.target.className.includes("task-start-date")) {
 

            this.setState({ editing: false })
        }
    }

    // handleClick = e => {
    //     if (this.Ref.current.contains(e.target)) {
    //         return;
    //     } else {
    //         this.setState({ editing: false });
    //     }
    // };

    fieldUpdate(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    inputAdder(value) {
        this.setState({ start_date: value });

    }
    stateBinder(value) {
        this.setState({ start_dateId: value });
        this.setState({ datePicked: true });
        this.setState({ pickingDate: false })
    }

    render() {
        if (this.state.editing) {
            const { datePicked, pickingDate, start_date } = this.state
            return (
                <Mutation
                    mutation={UPDATE_TASK_START_DATE}
                    onError={err => this.setState({ message: err.message })}
                >
                    {updateTaskStart_date => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateTaskStart_date({
                                        variables: { _id: this.props.id, start_date: this.state.start_dateId.start_date }
                                    }).then(this.setState({ editing: false, changes: true, datePicked: false }));
                                }}
                            >
                                CurrentDate:{start_date}
                                {pickingDate ? <StartDateDetailOption
                                    stateBinder={this.stateBinder}
                                    inputAdder={this.inputAdder}
                                    type={"start_date"}
                                /> : <div />}
                                {datePicked ? <button className="task-start-date update-button" type="submit">
                                    Update Start_Date
                </button> : <div />}

                            </form>
                        </div>
                    )}
                </Mutation>
            );
        } else {
            return (
                <div className="show-task-body">
                    {/* <div
                        onClick={this.handleEdit}
                        style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
                    >
                        
                    </div> */}
                    {/* <h2>Body: </h2> */}
                    <p className="Tagbox" onClick={this.handleEdit}>

                        <p className="start-words">Start_Date:</p> &nbsp; {this.props.start_date}
                        
                    </p>

                </div>
            );
        }
    }
}

export default StartDateDetail;
