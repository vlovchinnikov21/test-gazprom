import { Modal } from 'antd'

interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  productNames: string
  loading: boolean
  handleSubmit: () => void
}

const ItemCancelModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  productNames,
  loading,
  handleSubmit,
}) => {
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <>
      <Modal
        title='Товары на удаление'
        open={open}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText={'Применить'}
        cancelText={'Отклонить'}
      >
        <p>{`Вы уверены что хотите аннулировать товар(ы): ${productNames}?`}</p>
      </Modal>
    </>
  )
}

export default ItemCancelModal
