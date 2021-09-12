import { Dropdown } from "react-bootstrap"
import styled from "styled-components"

export const Wrapper = styled.div`
  position: relative;
`

export const DropdownMenu = styled(Dropdown.Menu)`
  max-height: 400px;
  overflow: auto;
`