import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { request } from '../../requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'


const StyledNewsDisplay = styled.div`
  border-top: 2px solid orange;
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Roboto3&display=swap');

  ${({active}) => active ? null : 'display: none;'}

  .header {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 800;
  }
  .source {
    font-size: 18px;
    font-weight: bold;
    color: gray;
  }
  .article {
    ${'' /* height: 50px; */}
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid lightgray;
  }
  .title2 {
    margin-top: 3px;
  }
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color: orange;
  }
  img {
    height: 40px;
    margin-right: 10px;
  }
  .active {
    background-color: orange;
    color: #323428;
    border: 1px solid orange;
  }
  .inactive {
    color: white;
    border: 1px solid white;
  }
  .hidden {
    display: none;
  }
  button {
    background: none;
    border-radius: 25px;
    outline: none;
    padding: 8px 15px 8px 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    margin-right: 20px;
    height: 45px;
    letter-spacing: 2px;
  }
  #twitterIcon {
    color: rgb(29, 161, 242);
    margin-right: 5px;
  }
  .tweet {
    display: flex;
  }
  #tweetIcon {
    color: rgb(29, 161, 242);
    margin-top: 5px;
    height: 45px;
    margin-right: 10px;
  }
  .hashTags {
    color: rgb(29, 161, 242);
  }
`





export default function News ({stock, isActive}) {

  const faviconBaseUrl = 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&'

  const formatTweet = (tweet) => {
    let tweetArr = tweet.split(' ')
    let hashTagsArr = []
    let bodyArr = []
    let link = ''
    tweetArr.map((str) => {
      if (str.startsWith('http')) {
        link = str
      } else if (str.startsWith('#')) {
        hashTagsArr.push(str)
      } else {
        bodyArr.push(str)
      }
      return null
    })
    let hashTags = hashTagsArr.join(' ')
    let body = bodyArr.join(' ')
    return(
      <div>
        <span className='title2'>
          {
            (link === '' ? body : <a href={link} target='_blank' rel='noreferrer' className='title2'>{body}</a>)
          }
        </span>
        <span className='hashTags'> {hashTags}</span>
      </div>
    )
  }

  const [news, setNews] = useState()
  const [tweets, setTweets] = useState()
  const [display, toggleDisplay] = useState({
    news: true,
    tweets: false
  })

  const handleDisplay = () => {
    toggleDisplay({
      news: !display.news,
      tweets: !display.tweets
    })
  }

  useEffect(() => {
    const getNews = async () => {
      const response = await request('darqube', 'news', stock.symbol)
      setNews(response.data)
    }
    getNews()

    const getTweets = async () => {
      const response = await request('darqube', 'tweets', stock.symbol)
      setTweets(response.data)
    }
    getTweets()
  }, [stock.symbol]) 


  return (news && tweets) ? (
    <StyledNewsDisplay active={isActive}>
      <div className='header'>
        <button onClick={handleDisplay} className={display.news ? 'active' : 'inactive'}>News</button>
        <button onClick={handleDisplay} className={display.tweets ? 'active' : 'inactive'}><FontAwesomeIcon icon={faTwitter} id='twitterIcon'/>Tweets</button>
      </div>
      <div className={display.news ? '' : 'hidden'}>
      {
        news.map((article) => {
          let site = article.url.split('/').splice(0,3).join('/')
          let favUrl = faviconBaseUrl + `url=${site}&size=15`
          return (
            <div className='article' key={article.title}>
              <img className='icon' src={favUrl} alt='icon'></img>
              <div>
                <a href={site} target='_blank' rel='noreferrer'><div className='source'>{article.source}</div></a>
                <a href={article.url} target='_blank' rel='noreferrer'><div className='title2'>{article.title}</div></a>
              </div>
            </div>
          )
        })
      }</div>
      <div className={display.tweets ? '' : 'hidden'}>
      {
        tweets.map((tweet) => {
          return (
            <div className='article' key={`${tweet.text}+${tweet.uname}`}>
              <FontAwesomeIcon icon={faTwitterSquare} id='tweetIcon'/>
              <div>
                <div className='source'>{tweet.uname}</div>
                {formatTweet(tweet.text)}
                {/* <div className='title2'>{tweet.text}</div> */}
              </div>
            </div>
          )
        })
      }
      </div>
    </StyledNewsDisplay>
  ) : null
}