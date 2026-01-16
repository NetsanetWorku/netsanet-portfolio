import { render, screen } from '@testing-library/react'
import App from './App'

// Mock scrollIntoView since it's not available in JSDOM
const mockScrollIntoView = jest.fn()
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
})

describe('Portfolio Integration Tests', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear()
  })

  test('renders portfolio with hero section', () => {
    render(<App />)
    const heroSection = screen.getByRole('main')
    expect(heroSection).toBeInTheDocument()
    
    expect(screen.getByText('Netsanet Worku')).toBeInTheDocument()
  })

  test('renders all main sections', () => {
    render(<App />)
    
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  test('navigation structure is present', () => {
    render(<App />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    const navigation = screen.getAllByRole('navigation')
    expect(navigation.length).toBeGreaterThan(0)
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  test('all sections have IDs for navigation', () => {
    render(<App />)
    
    expect(document.getElementById('hero')).toBeInTheDocument()
    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('projects')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
  })

  test('contact form is present and accessible', () => {
    render(<App />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  test('hero section buttons are present', () => {
    render(<App />)
    
    expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  test('project section has filter controls', () => {
    render(<App />)
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument()
  })

  test('images have alt text', () => {
    render(<App />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
    
    images.forEach(img => {
      expect(img.hasAttribute('alt')).toBe(true)
      expect(img.getAttribute('alt')).toBeTruthy()
    })
  })
})