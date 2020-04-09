import React from "react";
import ReactDOM from "react-dom";

class CreatePost extends React.Component {
    state = {
      error: false,
      isLoading: false,
      items: [],
      category: [],
      tags: [],
    };

    componentDidMount() {

      fetch("http://127.0.0.1:8000/category/")
        .then((response) => {

          return response.json();
        })
        .then((data) => {
        console.log(data);
          this.setState({ isLoading: true, category: data });
          console.log(this);

        });

        fetch("http://127.0.0.1:8000/tag/")
        .then((response) => {

          return response.json();
        })
        .then((data) => {
        console.log(data);
          this.setState({ isLoading: true, tags: data });
          console.log(this);

        });

    }

     onSubmit(event) {
        var category = document.getElementById("chooseCategory").value;
        var titleform = document.getElementsByName("title")[0].value
        var textform = document.getElementsByName("text")[0].value
        let post = {
          title: titleform,
          description: textform,
          id_category: category,
          date_publish: new Date(),
        };
        let response = fetch("http://127.0.0.1:8000/articles/article_create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Token b45a1c84dfeca666c2f3cd2b728386c0fb74013c"
          },
          body: JSON.stringify(post)
        });
        if (response) alert(`Статья создана!` + response);
        event.preventDefault();
      }



    render() {
      const { isLoaded, category, tags} = this.state;
      return (
        <div class="wrapper">
             <form onSubmit={this.onSubmit}>
                <div class="post">
            
                    <div class="post-category">

                        <label for="category">Категория:</label>

                        <select id="chooseCategory" name="category" value={category}>
                            {category.map((dat) => (
                                <option value={dat.id_category}>{dat.title}</option>
                          ))}

                       </select>

                    </div>

                    <div class="post-tags">

                        <label for="tags">Теги:</label>
                            <select id="chooseTag" name="tags" value={tags}>
                            {tags.map((tag) => (
                                <option value={tag.id_tag}>{tag.title}</option>
                          ))}

                       </select>
                    </div> 

                    <div class="post-title">

                        <label for="title">Заголовок:</label>
                        <input type="text" name="title"></input>

                    </div>

                    <div class="post-description">

                            <label for="text">Текст:</label>
                            <textarea name="text">
                                </textarea>
                            <input type="submit" value="Создать"></input>

                    </div>  

                
    
                </div>
            </form>
        </div>
      );
    }
  }
  export default CreatePost;