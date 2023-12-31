import styled from '@emotion/styled'
import Button from 'app/components/button'
import React from 'react'

const StyledPager = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
`

export type PagerProps = {
  page: number,
  onPageChange?: (page: number) => void
  totalPages: number | null | undefined
}



export default function Pager({page, totalPages, onPageChange}: PagerProps) {

  
  return (
    <StyledPager>
      <Button onClick={() => onPageChange?.(page - 1)} className='rounded'> {"<"} </Button>
      <page>{page}{!!totalPages ? `/${totalPages}` : ""}</page>
      <Button onClick={() => onPageChange?.(page + 1)} className='rounded'> {">"} </Button>
    </StyledPager>
  )

}


