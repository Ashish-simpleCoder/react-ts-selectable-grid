import SelectableGrid from './components/selectable-grid'

export default function App() {
   return (
      <div>
         <h1 className='text-center py-6 text-2xl'>Selectable Grid</h1>
         <div className='flex items-center justify-center'>
            <SelectableGrid />
         </div>
      </div>
   )
}
