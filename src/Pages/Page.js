import { useEffect, useState } from "react";
import axios from "axios";
import "./Page.css";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const requestUrl =
          "https://ixonotest.herokuapp.com/api/User/get-profiles";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        // console.log(responseJSON);
        setData(responseJSON);
      } catch (error) {}
    }
    fetchUserData();
  }, []);

  const sumbitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const mobileNum = event.target.mobileNum.value;
    const data = { name, email, username, password, mobileNum };
    axios.post("https://ixonotest.herokuapp.com/api/User/submit-profile", data)
      .then((response) => {
        console.log(response);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form method="POST" onSubmit={sumbitHandler}>
      <h1>Sumbit Page</h1>
        <label>Name:
          <input type="text" name="name" />
        </label>
        <br /> <br />
        <label>Email:
          <input type="email" name="email" />
        </label>
        <br /> <br />
        <label>Password:
          <input type="password" name="password" />
        </label>
        <br /> <br />
        <label>Mobile:
          <input type="text" name="mobileNum" />
        </label>
        <br /> <br />
        <label>UserName:
          <input type="text" name="username" />
        </label>
        <br /> <br />
        <button type="submit" value="Submit">
          Sumbit
        </button>
        <div class="btn">
          <button class="Btn" type="submit">
            show Data
          </button>
          <button class="Btn" type="submit">
            clear Data
          </button>
        </div>
        <div>
          <table>
            <thred>
              <tbody>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Name</th>
                  <th>Mobile Num</th>
                </tr>
                {data.map((users) => {
                  return (
                    <tr>
                      <td> {users.id}</td>
                      <td> {users.name}</td>
                      <td> {users.email}</td>
                      <td>{users.username}</td>
                      <td>{users.mobileNum}</td>
                    </tr>
                  );
                })}
              </tbody>
            </thred>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Page;
