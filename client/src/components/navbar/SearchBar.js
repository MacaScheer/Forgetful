// import React, { Component } from "react";
// // import "../stylesheets/greeting.scss";
// // import { Query } from "react-apollo";
// import { useQuery } from "@apollo/react-hooks";
// import Queries from "../../graphql/queries";
// import TaskIndex from "../tasks/TaskIndex";
// const { FETCH_USER } = Queries;

// class SearchBar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             queryString: "",
//             tasks: []
//         };
//         this.updateQueryString = this.updateQueryString.bind(this);
//         this.toggleDropDown = this.toggleDropDown.bind(this);
//     }

//     updateQueryString() {
//         e.preventDefault();
//         this.setState({
//             queryString: this.state.queryString.concat(e.target.value)
//         });
//         this.filterTasks();
//     }

//     //   searchTasks(data) {
//     //     // let tasks;
//     //     let narrowedSearch = [];
//     //     let queryString = this.state.queryString;

//     //     if (tasks) {
//     //       tasksArray = tasks.tasks;
//     //       tasksArray.forEach(task => {
//     //         if (
//     //           task.name.includes(queryString) ||
//     //           task.body.includes(queryString) ||
//     //           task.due_date.includes(queryString) ||
//     //           task.start_date.includes(queryString) ||
//     //           task.priority.includes(queryString) ||
//     //           task.location.includes(queryString)
//     //         ) {
//     //           narrowedSearch.push(task);
//     //         }
//     //       });
//     //       // cache.write
//     //     }
//     //   }
//     // Do we want it to be a dropdown or just update the index??
//     // toggleDropDown() {
//     //     const dropdown = document.getElementById("searchBar")
//     // }

//     //pass the narrowed search into another component
//     //push to frontend client
//     //function that listens to search button
//     //   updateCache(client, { data }) {
//     //     client.writeData({
//     //       data: { searchResults: data.user.tasks }
//     //     });
//     //   }
// }
//     filterInput.addEventListener("keyup", filterTasks);

//     function filterTasks(evt) {
//         let filterInput = evt.target.value.toUpperCase();
//         let taskListItems = document.getElementsByClassName("task-list");
        
//         // for (let i = 0; i < taskListItems; i++) {
//         //     let singleTask = taskListItems[i];
//         //     let singleTask.innerText.toUpperCase()
//         //     // for (let j = 0; j < singleTask.children.length; j++) {

//         //     // }
//         // }
//     }

//     componentDidMount() {
//         const Id = localStorage.getItem("currentUserId");
           
//         const { data, loading, error } = useQuery(
//             FETCH_USER,
//             { variables: { Id } }
//         );
//         if (loading) return <h2>Loading...</h2>;
//         if (error) return <p>Error: {error.message}</p>
//         if (data) {
//             this.setState({ tasks: data })
//         }
//     }


//     render() {
      
//     return (
//     //   <form className="searchbar-form" onSubmit={this.handleSubmit(search)}>
       
//             {/* <SearchResult tasks={narrowedSearch} /> */}

         
    
// <form >
//         <input
//           type="text"
//           onChange={this.updateQueryString}
//           value={this.state.queryString}
//         ></input>
//         <input type="submit" value="submit">
//           Search Tasks
//         </input>
// </form>

//       );
//   }
// }

// export default SearchBar;
