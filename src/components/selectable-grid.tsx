import { MouseEventHandler, useMemo, useRef, useState } from 'react'

export default function SelectableGrid(props: { rows?: number; cols?: number }) {
   const rows = props.rows ?? 10
   const cols = props.cols ?? 10

   const gridArr = useMemo(() => Array(rows * cols), [rows, cols])
   const [isMouseDown, setIsMouseDown] = useState(false)
   const [selectedBoxes, setSelectedBoxes] = useState<Array<number>>([])
   const startBoxRef = useRef<number>()

   const handleMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsMouseDown(false)
      startBoxRef.current = undefined
   }

   const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsMouseDown(true)
      const id = (e.target as HTMLDivElement).getAttribute('data-id')
      setSelectedBoxes([Number(id)])
      startBoxRef.current = Number(id)
   }

   const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
      if (!isMouseDown || !startBoxRef.current) return

      const id = (e.target as HTMLDivElement).getAttribute('data-id')

      const startBox = startBoxRef.current
      const endBox = Number(id)

      const startRow = Math.floor((startBox - 1) / cols)
      const startCol = (startBox - 1) % cols

      const endRow = Math.floor((endBox - 1) / cols)
      const endCol = (endBox - 1) % cols

      const minRow = Math.min(startRow, endRow)
      const maxRow = Math.max(startRow, endRow)

      const minCol = Math.min(startCol, endCol)
      const maxCol = Math.max(startCol, endCol)

      const selectedItems = []

      for (let row = minRow; row <= maxRow; row++) {
         for (let col = minCol; col <= maxCol; col++) {
            selectedItems.push(row * cols + col + 1)
         }
      }

      setSelectedBoxes(selectedItems)
   }

   return (
      <div className='selectable-grid grid grid-cols-10 grid-rows-10 gap-1' onMouseUp={handleMouseUp}>
         {[...gridArr.keys()].map((_, idx) => {
            return (
               <div
                  key={idx}
                  data-id={idx + 1}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  className={`grid-item w-10 h-10 flex items-center justify-center border border-black cursor-pointer select-none ${selectedBoxes.includes(idx + 1) ? 'bg-purple-200' : ''}`}
               >
                  {idx + 1}
               </div>
            )
         })}
      </div>
   )
}
