import dayjs from "dayjs"

export const format = (date, format)=>{
  if(!date){
    return ''
  }

  return dayjs(date).format(format)
}