import { render, screen } from '@testing-library/react'
import ProductForm from '@/components/ProductForm'

describe('Unit Test: ProductForm Component', () => {
  it('renders correctly with default fields', () => {
    render(<ProductForm onSubmit={jest.fn()} />)
    
    expect(screen.getByPlaceholderText('Contoh: John Doe')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contoh: E-Book Next.js')).toBeInTheDocument()
    expect(screen.getByText('Simpan Produk')).toBeInTheDocument()
  })
})
