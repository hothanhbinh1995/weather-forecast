import styled from "styled-components"
import { rotate } from "../../utils/styles/animations"
import Icon from "../Icon"

export const RotateIcon = styled(Icon)`
  animation: ${rotate} 2s linear infinite;
  display: inline-block;
`