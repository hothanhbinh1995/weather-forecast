import { isEmpty } from 'lodash'
import React from 'react'
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap'
import { KEY_CODES } from '../../constants'
import { DropdownContent, Wrapper } from './AutocompleteInput.styled'


const AutocompleteInput = (props) => {
  const { rightText, suggestionList, focusFirstItemOnShow, onSelect, ...restProps } = props

  return <Wrapper>
    <InputGroup>
      <Dropdown onSelect={onSelect} focusFirstItemOnShow={focusFirstItemOnShow} show={!isEmpty(suggestionList)} autoClose>
        <Dropdown.Toggle as={FormControl} {...restProps}>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100 rounded-bottom">
          {suggestionList.map(
            suggest =>
              <Dropdown.Item
                onKeyDown={(e) => {
                  if(e.keyCode === KEY_CODES.ENTER){
                    onSelect(suggest.key, e)
                  }
                }}
                key={suggest.key}
                eventKey={suggest.key}
              >
                {suggest.title}
              </Dropdown.Item>
          )}
        </Dropdown.Menu>
        {rightText && <InputGroup.Text>{rightText}</InputGroup.Text>}
      </Dropdown>
    </InputGroup>
  </Wrapper>
}

AutocompleteInput.defaultProps = {
  suggestionList: [],
  focusFirstItemOnShow: false
}

export default AutocompleteInput