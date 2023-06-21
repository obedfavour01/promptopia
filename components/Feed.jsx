'use client'

import {useEffect,useState} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className = "mt-16 prompt_layout"> 
        {
             data.map((post) => {
           return (
               <PromptCard
                   key= {post._id}
                   post = {post}
                   handleTagClick = {handleTagClick}
               />
 
             )
           })
        }
    </div>
  )
}


const Feed = () => {

  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [filteredPosts, setFilteredPosts] = useState([])


  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
     clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    console.log(searchTimeout)

    setSearchTimeout(setTimeout(() => {
       const filteredResult =  filtering(searchText)
       setFilteredPosts(filteredResult)
    },1000))
  }

  const filtering = (searchText) => {

          return posts.filter((post) =>   (post.creator.username.includes(searchText) || 
                  post.prompt.includes(searchText) || 
                  post.tag.includes(searchText)
            )
          )
    
  }

  const handleTagClick = (tagVal) => {
      setSearchText(tagVal)
      const filteredResult =  filtering(tagVal)
      setFilteredPosts(() => filteredResult)
  }




  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      
      setPosts(data)

    } 
    fetchPosts()
  },[])

  return (
    <div>
      <section className="feed">
        <form className='relative w-full flex-center'>
          <input type="text" 
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>


      {searchText ?  <PromptCardList 
            data = {filteredPosts}
            searchText = {searchText}
            handleTagClick= {handleTagClick}
            filteredPosts = {filteredPosts}
        />

        :

        <PromptCardList 
            data = {posts}
            searchText = {searchText}
            handleTagClick= {handleTagClick}
            filteredPosts = {filteredPosts}
        />

      }

        
      </section>
    </div>
  )
}

export default Feed