import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import propTypes from 'prop-types'
import BasicTableArticle from './BasicTableArticle/BasicTableArticle'

const CardOfTableArticle = (props) => {
  const [propsSelectedArticle, setPropsSelectedArticle] = useState({})
  console.log('propsSelectedArticle: ', propsSelectedArticle)
  const [newData, setNewData] = useState([])

  useEffect(() => {
    if (!!props.selectedArticles?.id) {
      console.log(props.selectedArticles)
      let a = props.selectedArticles
      setPropsSelectedArticle(a)
    }
  }, [props.selectedArticles])

  // const test = (e) => {
  //   console.log(e)
  // }

  const renderBasicTableArticle = () => {
    if (propsSelectedArticle.length !== 0 && propsSelectedArticle !== null) {
      return (
        <div>
          <div style={{ marginBottom: '10px', marginTop: '40px' }}>
            {/* <p>{JSON.stringify(propsSelectedArticle)}</p> */}
            <div style={{ marginTop: '-20px', marginBottom: '-30px' }}>
              <BasicTableArticle
                propsSelectedArticle={propsSelectedArticle}
                setNewData={setNewData}
                newData={newData}
                // setPropsSelectedArticle={(e) => {
                //   test(e)
                // }}
                // setPropsSelectedArticle={setPropsSelectedArticle}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div>
            <Alert sx={{ marginBottom: '10px' }} severity="warning">
              Select an article
            </Alert>
          </div>
        </>
      )
    }
  }

  // const template = (options) => {
  //   const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up'
  //   const className = `${options.className} justify-content-start`
  //   const titleClassName = `${options.titleClassName} pl-1`

  //   return (
  //     <div className={className}>
  //       <button className={options.togglerClassName} onClick={options.onTogglerClick}>
  //         <span className={toggleIcon} />
  //       </button>
  //       <span className={titleClassName}>Toggle articles details</span>
  //     </div>
  //   )
  // }

  return (
    <>
      <div>{renderBasicTableArticle()}</div>
    </>
  )
}

export default CardOfTableArticle

CardOfTableArticle.propTypes = {
  toggleFieldSetArticle: propTypes.bool,
  selectedArticles: propTypes.any,
}
