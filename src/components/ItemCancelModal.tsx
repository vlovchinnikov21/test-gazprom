import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import axios from 'axios'
import { ModalProps } from '../types/ModalProps'

const ItemCancelModal: React.FC<ModalProps> = ({ open, setOpen, selectedProducts }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('')

  useEffect(() => {
    const productsNames = selectedProducts.map((item) => item.name).join(', ')
    setModalText(productsNames)
  }, [selectedProducts])

  const handleOk = () => {
    axios({
      url: 'http://127.0.0.1:3008/cancel',
      method: 'POST',
      data: selectedProducts.map((item) => item.id),
    })
      .then((res) => {
        console.log(res)
        setConfirmLoading(true)
        setTimeout(() => {
          setOpen(false)
          setConfirmLoading(false)
        }, 2000)
      })
      .catch((err) => console.log(err))
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <>
      <Modal
        title='Товары на удаление'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={'Применить'}
        cancelText={'Отклонить'}
      >
        <p>{`Вы уверены что хотите аннулировать товар(ы): ${modalText}?`}</p>
      </Modal>
    </>
  )
}

export default ItemCancelModal
