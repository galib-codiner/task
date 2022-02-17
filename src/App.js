import { useState , useEffect} from "react";
import axios from "axios";
import './App.css'

function App() {
  const [selectedPosts, setSelectedPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data1 = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data2 = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (data1 && data2) {
        const posts = [];
        for (var i = 0; i < data1.data.length; i++) {
          for (var j = 0; j < data2.data.length; j++) {
            // console.log('find user =>', users[j].name);
            if (data2.data[j].id === data1.data[i].id) {
              posts.push({
                username: data2.data[j].username,
                title: data1.data[i].title,
                body: data1.data[i].body
              });
            }
          }
          setSelectedPosts(posts);
        }
      }
    };
    fetchData();
  }, []);
  console.log("selected posts", selectedPosts);
  return (

    <>
    <h3 className='text-center mt-3 text-light'>
      <span className="bold text-dark">Problem Statement : </span> <br /> You have to create post page using posts api 
      post should have user name that you can fetch from user id also for post use.
      card what you already use
    </h3>

    <div classNameName='container'>
        <div className='row'>
            {
                selectedPosts.map((user) => {
                    return (
                        <div className='col-md-4 offset-md-4 col-sm-12'>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                      <span>Title : </span>  {user.title}
                                    </h5>
                                    <p className="card-text">
                                      <span>Body : </span>  {user.body}
                                    </p>
                                    <button className="btn"> <span> Username: </span>  {user.username}  </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    </div>
    </>
  );
}

export default App