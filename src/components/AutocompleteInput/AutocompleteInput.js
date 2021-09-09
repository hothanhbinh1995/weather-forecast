import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

const AutocompleteInput = (props)=>{

  return <InputGroup>
    <FormControl
      {...props}
    />
  {/* <SuggestionDropdownContent>
    <Dropdown.Menu className="w-100 rounded-bottom" show>
      <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
      <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
    </Dropdown.Menu>
  </SuggestionDropdownContent>
  <InputGroup.Text><i class="bi-search"></i></InputGroup.Text> */}

</InputGroup>
}

export default AutocompleteInput