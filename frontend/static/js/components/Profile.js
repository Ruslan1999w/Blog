import React from "react";
import ReactDOM from "react-dom";
import "./comp_style/style.scss";


class Profile extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        error: false,
        isLoading: false,
        items:[]
    };

    componentDidMount() {
    fetch("http://127.0.0.1:8000/auth/personal_account", {
      headers: {
          Authorization: "Token b45a1c84dfeca666c2f3cd2b728386c0fb74013c",
          method: "GET",
      }
    })
    .then(response => {
        return response.json();
      })

    .then(data => {
    this.setState({ isLoading: true, items: data });
    console.log(this);

});


}

  render() {
    const { isLoaded, items } = this.state;
    return (
      <div class="wrapper">
          <div class="profile">
            <div class="info">
              <ul>
                <li><p>Ник:</p>{items.username}</li>
                <li><p>Имя:</p>{items.first_name}</li>
                <li><p>Фамилия:</p>{items.last_name}</li>
                <li><p>С нами с:</p>{items.date_joined}</li>
                <li><p>Github:</p>{items.git_reference}</li>
              </ul>
            </div>
            <div class='profile-comments'>


            </div>

            <div class='profile-rate'>
            </div>
          </div>

      </div>
    );
  }
}
export default Profile;