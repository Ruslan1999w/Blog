import React from 'react';
import { Link } from 'react-router-dom';
import NoteCreate from './NoteCreate';
import './comp_style/article_retrieve.scss';
import Articles_retrieve_all_notes from './Articles_retrieve_all_notes';
class Articles_retrieve extends React.Component {
  state = {
    items: [],
    creator: [],
  };
  componentDidMount() {
    const id = Number(this.props.match.params.number);
    fetch('http://127.0.0.1:8000/articles/' + id, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let creator_list = data.post_creator.map((creat) => {
          return creat;
        });
        this.setState({ id_post: id, items: data, creator: creator_list });
      });
  }
  render() {
    const { items, creator } = this.state;
    return (
      <div class="wrapper">
        <div class="title">
          <div class="title-wrap">
            {creator.map((rate) => (
              <div class="profile-rate">
                <h2>{items.title}</h2>
                <h4>
                  <Link to={`/users/${rate.id_auth_user.id}`}>
                    {rate.id_auth_user.username}
                  </Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
        <div class="book">
          <p> {items.description}</p>
          <img src={items.date_publish}></img>
          <NoteCreate id_post={Number(this.props.match.params.number)} />
          <Articles_retrieve_all_notes
            id_post={Number(this.props.match.params.number)}
          />
        </div>
      </div>
    );
  }
}
export default Articles_retrieve;
