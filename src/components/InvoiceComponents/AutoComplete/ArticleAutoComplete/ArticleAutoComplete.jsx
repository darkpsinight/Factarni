import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { getUsers } from '../../../../Service/apiArticle'
import AlertMessageArticleNetwork from '../../AlertMessage/AlertMessageArticleNetwork'
import './style.css'
import propTypes from 'prop-types'

const ArticleAutoComplete = (props) => {
  const [articlesAPI, setArticlesAPI] = useState([])
  // const [selectedArticle, setSelectedArticle] = useState(null)
  // const [selectedArticles, setSelectedArticle] = useState([])
  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    getUsers()
      .then((response) => {
        setArticlesAPI(response.data)
      })
      .catch((error) => {
        if (!error.status) {
          setNetworkError(true)
        }
      })
  }, [])

  // useEffect(() => {
  //   props.setSelectedArticle(Array(selectedArticle))
  //   // eslint-disable-next-line
  // }, [selectedArticle])

  // console.log('selectedArticle :', selectedArticle)

  function handleChange(event, selectedArticleValue) {
    props.setSelectedArticles(selectedArticleValue)
    // console.log('selectedValue: ', selectedArticleValue)
    // if (selectedArticleValue && !props.selectedArticles.includes(selectedArticleValue)) {
    //   props.setSelectedArticles([...props.selectedArticles, selectedArticleValue])
    // }
    // console.log('selectedArticles: ', props.selectedArticles)
  }

  return (
    <>
      <div className="field">
        <h5>Article:</h5>
        <Autocomplete
          disablePortal
          id="tags-standard"
          options={articlesAPI}
          getOptionLabel={(option) => option.article}
          onChange={handleChange}
          // getOptionDisabled={(option) =>
          //   props.selectedArticles.some((selectedOption) => selectedOption === option)
          // }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Select articles"
              placeholder="Pick article..."
              fullWidth
            />
          )}
        />
      </div>
      <div>{networkError && <AlertMessageArticleNetwork />}</div>
    </>
  )
}

export default ArticleAutoComplete

ArticleAutoComplete.propTypes = {
  setToggleFieldSetArticle: propTypes.func,
  toggleFieldSetArticles: propTypes.bool,
  setSelectedArticles: propTypes.func,
  selectedArticles: propTypes.any,
}
