import React from 'react';
import './comp_style/article_comment_form.scss';
import { connect } from 'react-redux';

class NoteCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      creator: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    let comment = {
      description: document.getElementById('comments').value,
      id_post: [this.props.id_post],
    };
    console.log(comment);
    fetch('http://127.0.0.1:8000/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.props.user.token,
      },
      body: JSON.stringify(comment),
    }).then((response) => {
      if (response.ok) alert(response.ok);
      else console.log(response.status);
    });

    event.preventDefault();
  }
  render() {
    const { comments, creator } = this.state;
    return (
      <div class="commetnt_form">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea
              name="comments"
              id="comments"
              cols="90"
              rows="10"
              placeholder="Leave your comment here ..."
            ></textarea>
          </div>

          <div className="form-group">
            <input type="submit" value="Commit!" />
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    user: store.user,
    test: store.test,
  };
};
export default connect(mapStateToProps)(NoteCreate);
