import AddModal from '../../src/components/AddModal.vue'
import { render, fireEvent, waitFor } from '@testing-library/vue'
import '@testing-library/jest-dom'

jest.spyOn(console, 'warn').mockImplementation(() => {})

it('displays modal dialog with Add todo form', async () => {
  const { findByText, getByText, getByPlaceholderText, getByTestId } = render(AddModal, {
    props: {
      showModal: true
    }
  })

  await waitFor(() => {
    expect(getByTestId('modal')).toBeInTheDocument()
  })

  const header = await findByText('Add note')
  expect(header).toBeInTheDocument()
  const titleInput = getByPlaceholderText('Add title')
  expect(titleInput).toBeInTheDocument()
  const contentInput = getByPlaceholderText('Content')
  expect(contentInput).toBeInTheDocument()
  const saveButton = getByText('Save')
  expect(saveButton).toBeInTheDocument()
  const cancelButton = getByText('Cancel')
  expect(cancelButton).toBeInTheDocument()

  expect(console.warn).not.toHaveBeenCalled()
})

it('validates form properly by displaying errors', async () => {
  const { findByText, getAllByText, getByTestId } = render(AddModal, {
    props: {
      showModal: true
    }
  })

  expect(getByTestId('modal')).toBeInTheDocument()

  const saveButton = await findByText('Save')
  expect(saveButton).toHaveAttribute('type', 'submit')
  await fireEvent.click(saveButton)

  const errors = getAllByText('Field cannot be empty!')
  expect(errors).toHaveLength(2)

  expect(console.warn).not.toHaveBeenCalled()
})

it('resets form after cancelation', async () => {
  const { findByText, getByPlaceholderText, getByTestId } = render(AddModal, {
    props: {
      showModal: true
    }
  })
  expect(getByTestId('modal')).toBeInTheDocument()

  const cancelButton = await findByText('Cancel')
  fireEvent.click(cancelButton)
  expect(getByPlaceholderText('Add title')).toHaveValue('')
  expect(getByPlaceholderText('Content')).toHaveValue('')

  expect(console.warn).not.toHaveBeenCalled()
})

it('emits show event to hide modal after clicking Cancel button', async () => {
  const { findByText, emitted, getByTestId } = render(AddModal, {
    props: {
      showModal: true
    }
  })
  expect(getByTestId('modal')).toBeInTheDocument()

  const cancelButton = await findByText('Cancel')
  await fireEvent.click(cancelButton)
  expect(emitted()).toHaveProperty('show')
  expect(emitted().show[0]).toEqual([false])
  expect(console.warn).not.toHaveBeenCalled()
})
