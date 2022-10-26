import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [news, setNews] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy="$priority"&limitToFirst=${limit}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
  }, [limit])


  const scrollToEnd = () => {
    setLimit(limit + 10);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };


  return (
    <div className="App">
      <div className='header'>
        <h1>HackerNews New Stories</h1>
      </div>


      {news ?
        news.map((storyid) => (
          <Test storyid={storyid} />
        )) : <p>Loading...</p>}
    </div>
  );
}



export function Test({ storyid }) {
  const [story, setStory] = useState({});

  // get story by Id from API
  const getstory = (storyid) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyid}.json`)
      .then((res) => res.json())
      .then((data) => setStory(data))
  }
  useEffect(() => {
    getstory(storyid)
  });

  return story && story.title ? (
    <div className='newscard'>
      <h1 className='title'> {story.title}</h1>
      <div className='child'>
        <p className='author'> by <span> {story.by}</span></p>
        <a href={story.url} className='url'>Read more</a>
      </div>
    </div>
  ) : null;

}


export default App;





