import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap'
import { KEY_CODES } from '../../constants'
import Loader from '../Loader'
import { DropdownMenu, Wrapper } from './AutocompleteInput.styled'


const AutocompleteInput = ({
  rightText, suggestionList,
  focusFirstItemOnShow, onSelect,
  value, emptyText,
  isSuggestionLoading, ...restProps
}) => {
  const [isDropdownContentShow, setIsDropdownContentShow] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  const handleToggle = (isShow, e) => {
    // keep dropdown open when input focused
    if (isFocus && !isShow) {
      return
    }

    // don't show dropdown menu when suggestion is empty
    if (isEmpty(suggestionList) && !value && isShow) {
      return
    }

    setIsDropdownContentShow(isShow)
  }

  useEffect(() => {
    if (!isFocus) {
      return
    }

    if (value && !isDropdownContentShow) {
      setIsDropdownContentShow(true)
    }
    else if (!value && isDropdownContentShow) {
      setIsDropdownContentShow(false)
    }
  }, [value, isDropdownContentShow, isFocus])

  const handleInputFocus = () => setIsFocus(true)
  const handleInputBlur = () => setIsFocus(false)

  const renderMenu = () => {
    if (isSuggestionLoading) {
      return <div className="text-center"><Loader className="fs-4" /></div>
    }
    const showEmptyText = value && isEmpty(suggestionList)

    if (showEmptyText) {
      return <div className="text-center">{emptyText}</div>
    }

    return suggestionList.map(
      suggest =>
        <Dropdown.Item
          onKeyDown={(e) => {
            if (e.keyCode === KEY_CODES.ENTER) {
              onSelect(suggest.key, e)
            }
          }}
          key={suggest.key}
          eventKey={suggest.key}
        >
          {suggest.title}
        </Dropdown.Item>
    )
  }

  return <Wrapper>
    <InputGroup>
      <Dropdown
        onSelect={onSelect}
        onToggle={handleToggle}
        show={isDropdownContentShow}
      >
        <Dropdown.Toggle onFocus={handleInputFocus} onBlur={handleInputBlur} as={FormControl} value={value} {...restProps} />
        <DropdownMenu className="w-100">{renderMenu()}</DropdownMenu>
        {rightText && <InputGroup.Text>{rightText}</InputGroup.Text>}
      </Dropdown>
    </InputGroup>
  </Wrapper>
}

AutocompleteInput.defaultProps = {
  suggestionList: [],
  focusFirstItemOnShow: false,
}

export default AutocompleteInput