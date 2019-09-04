
// to implement later down the line
tools() {
  return (
    <div>
      <button onClick={this.inputChar} value="^">
        <i className="fas fa-calendar" value="^" />
      </button>{" "}
      {/* duedate*/}
      {/* <button onClick={this.inputChar} value="~">
          b
        </button> */}
      {/* startdate*/}
      {/* <button onClick={this.inputChar} value="!">c</button> */}
      {/* <button onClick={this.inputChar} value="#">
          d
        </button> */}
      {/* priority */}
      <button onClick={this.inputChar} value="*">
        <i className="fas fa-list" value="*" />
      </button>
      {/* list */}
      <button onClick={this.inputChar} value="@">
        <i className="fas fa-tags" value="@" />
      </button>
      {/* tag */}
    </div>
  );
}

//using for parsing time 
var today = new Date(); // << how you set current date
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
//check if works for start_date === today
