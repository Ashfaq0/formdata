import { white } from "kleur";
import React, { useState } from "react";
import ReactDOM from "react-dom";


const style = {
 
  table: {
    borderCollapse: "collapse",
    margin:"auto",
    textAlign: "center",
    
  },
  tableCell: {
    backgroundColor:"white",
    border: "4px solid white",
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
    fontSize: "20px",
    margin:"0",
   
  },
  form: {
    container: {
      padding: "20px",
      border: "4px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
      margin:"auto",
      textAlign: "center",
      color:"white",
    },
    inputs: {
      marginBottom: "20px",
      padding: "10px 30px",
      fontSize: "15px",
      
    },
    submitBtn: {
      marginTop: "10px",
      padding: "12px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "17px",
      borderRadius: "5px",
    },
  },
};

function FormData(props) {
  const initData = {
    id: null,
    userEmpname: "Ashfaq",
    userTotaldays: "30",
    userAvailabledays: "22",
    userBandscore: "A",
  };

  const [userState, setUserState] = useState(initData);

  const handleUserChange = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userState.userEmpname || !userState.userTotaldays || !userState.userAvailabledays || !userState.userBandscore) return;
    props.addUser(userState);
    setUserState(initData);
  };

  return (
   
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>EMPLOYER NAME:</label>
      <br />
      <input style={style.form.inputs} className="userEmpname" name="userEmpname" type="text" value={userState.userEmpname} onChange={handleUserChange} required />
      <br />
      <label>TOTAL DAYS:</label>
      <br />
      <input style={style.form.inputs} className="userTotaldays" name="userTotaldays" type="number" value={userState.userTotaldays} min="1" max="30" onChange={handleUserChange} />
      <br />
      <label>AVAILABLE DAYS:</label>
      <br />
      <input style={style.form.inputs} className="userAvailabledays" name="userAvailabledays" type="number" value={userState.userAvailabledays} min="1" max="30"onChange={handleUserChange} />
      <br />
      <label>	BAND SCORE: </label> 
      <br />
      <input style={style.form.inputs} className="userBandscore" name="userBandscore" type="text" value={userState.userbandscore} onChange={handleUserChange} required />
      <br />
      <input style={style.form.submitBtn} className="submitButton" type="submit" value="Add User" />
      
     
    
    </form>
    
  );
  
}

function InformationTable(props) {
  const sortedData = props.users.sort((a, b) => a.userTotaldays.localeCompare(b.userTotaldays));

  const display =
    sortedData.length > 0 ? (
      sortedData.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.userEmpname}</td>
          <td style={style.tableCell}>{user.userTotaldays}</td>
          <td style={style.tableCell}>{user.userAvailabledays}</td>
          <td style={style.tableCell}>{user.userBandscore}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3}>&nbsp;</td>
      </tr>
    );

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>EMPLOYER NAME</th>
          <th style={style.tableCell}>TOTAL DAYS</th>
          <th style={style.tableCell}>AVAILABLE DAYS</th>
          <th style={style.tableCell}>BAND SCORE</th>
        </tr>
      </thead>
      <tbody>{display}</tbody>
    </table>
  );
}

function Application(props) {
  const usersObj = [];

  const [users, setUsers] = useState(usersObj);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  return (
    <section>
      <FormData addUser={addUser} />
      <InformationTable users={users} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));

export default Application;
