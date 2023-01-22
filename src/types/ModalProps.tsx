import { DataType } from './DataType'

export interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedProducts: DataType[]
}
