import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const requestStatusConstants = {
  inProgress: 'In Progress',
  success: 'Success',
  failure: 'Failure',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    repoList: [],
    requestStatus: requestStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const fetchedData = await fetch(url)
    const data = await fetchedData.json()
    const updatedData = data.popular_repos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    if (fetchedData.ok === true) {
      this.setState({
        repoList: updatedData,
        requestStatus: requestStatusConstants.success,
      })
    } else if (fetchedData.status === 403) {
      this.setState({requestStatus: requestStatusConstants.failure})
    }
  }

  changeLanguage = id => {
    this.setState(
      {activeLanguage: id, requestStatus: requestStatusConstants.inProgress},
      this.getRepos,
    )
  }

  showContent = () => {
    const {requestStatus, repoList} = this.state

    switch (requestStatus) {
      case requestStatusConstants.inProgress:
        return (
          <div testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case requestStatusConstants.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1>Something Went Wrong</h1>
          </div>
        )
      case requestStatusConstants.success:
        return (
          <ul className="repo-list">
            {repoList.map(eachItem => (
              <RepositoryItem key={eachItem.id} repoDetails={eachItem} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const {activeLanguage} = this.state
    return (
      <div className="bg">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              details={eachItem}
              activeLanguage={activeLanguage}
              changeLanguage={this.changeLanguage}
            />
          ))}
        </ul>
        {this.showContent()}
      </div>
    )
  }
}

export default GithubPopularRepos
