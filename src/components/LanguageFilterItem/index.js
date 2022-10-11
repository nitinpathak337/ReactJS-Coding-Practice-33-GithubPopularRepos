// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, activeLanguage, changeLanguage} = props
  const {id, language} = details
  const activeLangTab = id === activeLanguage ? 'active-btn' : ''

  const onChange = () => {
    changeLanguage(id)
  }

  return (
    <li className="list-item">
      <button
        className={`language-button ${activeLangTab}`}
        type="button"
        onClick={onChange}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
