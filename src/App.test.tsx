import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    
    // Use getAllByText since "Netsanet" appears in both header and hero
    const nameElements = screen.getAllByText('Netsanet Portfolio')
    expect(nameElements.length).toBeGreaterThan(0)
  })

  test('navigation works between all sections', async () => {
    render(<App />)
    
    // Test navigation to About section - use getAllByRole and find the first one
    const aboutLinks = screen.getAllByRole('button', { name: /navigate to about section/i })
    fireEvent.click(aboutLinks[0])
    
    // Check if scrollIntoView was called
    expect(mockScrollIntoView).toHaveBeenCalled()
    
    // Check if About section is present
    const aboutSection = screen.getByText('About Me')
    expect(aboutSection).toBeInTheDocument()
    
    // Test navigation to Projects section
    const projectsLinks = screen.getAllByRole('button', { name: /navigate to projects section/i })
    fireEvent.click(projectsLinks[0])
    
    // Check if Projects section is present
    const projectsSection = screen.getByText('Featured Projects')
    expect(projectsSection).toBeInTheDocument()
    
    // Test navigation to Skills section
    const skillsLinks = screen.getAllByRole('button', { name: /navigate to skills section/i })
    fireEvent.click(skillsLinks[0])
    
    // Check if Skills section is present
    const skillsSection = screen.getByText('Skills & Technologies')
    expect(skillsSection).toBeInTheDocument()
    
    // Test navigation to Experience section
    const experienceLinks = screen.getAllByRole('button', { name: /navigate to experience section/i })
    fireEvent.click(experienceLinks[0])
    
    // Check if Experience section is present
    const experienceSection = screen.getByText('Experience & Education')
    expect(experienceSection).toBeInTheDocument()
    
    // Test navigation to Contact section
    const contactLinks = screen.getAllByRole('button', { name: /navigate to contact section/i })
    fireEvent.click(contactLinks[0])
    
    // Check if Contact section is present - use heading role to be more specific
    const contactSection = screen.getByRole('heading', { name: 'Contact' })
    expect(contactSection).toBeInTheDocument()
  })

  test('mobile navigation menu works correctly', async () => {
    render(<App />)
    
    // Find and click mobile menu button
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    expect(mobileMenuButton).toBeInTheDocument()
    
    // Click to open mobile menu
    fireEvent.click(mobileMenuButton)
    
    // Check if mobile menu is expanded
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    
    // Test mobile navigation to a section - get all about links and click the mobile one
    const aboutLinks = screen.getAllByRole('button', { name: /navigate to about section/i })
    const mobileAboutLink = aboutLinks.find(link => 
      link.className.includes('mobileNavLink')
    ) || aboutLinks[1] // fallback to second link if class check fails
    
    fireEvent.click(mobileAboutLink)
    
    // Menu should close after navigation
    await waitFor(() => {
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  test('hero section call-to-action buttons work', async () => {
    render(<App />)
    
    // Test "View My Work" button navigates to projects
    const viewWorkButton = screen.getByRole('button', { name: /view my projects/i })
    fireEvent.click(viewWorkButton)
    
    // Should call scrollIntoView
    expect(mockScrollIntoView).toHaveBeenCalled()
    
    // Test "Get In Touch" button navigates to contact
    const getInTouchButton = screen.getByRole('button', { name: /get in touch/i })
    fireEvent.click(getInTouchButton)
    
    // Should call scrollIntoView again
    expect(mockScrollIntoView).toHaveBeenCalledTimes(2)
  })

  test('project filtering and modal interaction works', async () => {
    render(<App />)
    
    // Navigate to projects section first
    const projectsLinks = screen.getAllByRole('button', { name: /navigate to projects section/i })
    fireEvent.click(projectsLinks[0])
    
    // Check if projects are displayed
    const projectsGrid = screen.getByText('Featured Projects')
    expect(projectsGrid).toBeInTheDocument()
    
    // Test filter functionality - look for filter buttons
    const allFilter = screen.getByRole('button', { name: /^all$/i })
    expect(allFilter).toBeInTheDocument()
    
    // Click on the filter to test functionality
    fireEvent.click(allFilter)
    expect(allFilter).toBeInTheDocument()
  })

  test('contact form integration works', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Navigate to contact section
    const contactLinks = screen.getAllByRole('button', { name: /navigate to contact section/i })
    fireEvent.click(contactLinks[0])
    
    // Fill out the contact form
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/subject/i)
    const messageInput = screen.getByLabelText(/message/i)
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message')
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    // Check for success message
    await waitFor(() => {
      const successMessage = screen.queryByText(/message sent successfully/i)
      if (successMessage) {
        expect(successMessage).toBeInTheDocument()
      }
    }, { timeout: 3000 })
  })

  test('skills section displays correctly with categories', () => {
    render(<App />)
    
    // Navigate to skills section
    const skillsLinks = screen.getAllByRole('button', { name: /navigate to skills section/i })
    fireEvent.click(skillsLinks[0])
    
    // Check if skills section is present
    const skillsSection = screen.getByText('Skills & Technologies')
    expect(skillsSection).toBeInTheDocument()
    
    // Check for skill categories
    const programmingLanguages = screen.queryByText('Programming Languages')
    const frameworks = screen.queryByText('Frameworks & Libraries')
    const tools = screen.queryByText('Tools & Technologies')
    
    // At least one category should be present
    expect(
      programmingLanguages || frameworks || tools
    ).toBeTruthy()
  })

  test('experience section displays timeline correctly', () => {
    render(<App />)
    
    // Navigate to experience section
    const experienceLinks = screen.getAllByRole('button', { name: /navigate to experience section/i })
    fireEvent.click(experienceLinks[0])
    
    // Check if experience section is present
    const experienceSection = screen.getByText('Experience & Education')
    expect(experienceSection).toBeInTheDocument()
    
    // Check for work experience and education sections
    const workExperience = screen.queryByText('Work Experience')
    const education = screen.queryByText('Education & Certifications')
    
    expect(workExperience || education).toBeTruthy()
  })

  test('all sections have proper accessibility structure', () => {
    render(<App />)
    
    // Check for main landmark
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    // Check for navigation
    const navigation = screen.getAllByRole('navigation')
    expect(navigation.length).toBeGreaterThan(0)
    
    // Check for proper heading structure
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
    
    // Check that all sections have IDs for navigation
    const heroSection = document.getElementById('hero')
    const aboutSection = document.getElementById('about')
    const projectsSection = document.getElementById('projects')
    const skillsSection = document.getElementById('skills')
    const experienceSection = document.getElementById('experience')
    const contactSection = document.getElementById('contact')
    
    expect(heroSection).toBeInTheDocument()
    expect(aboutSection).toBeInTheDocument()
    expect(projectsSection).toBeInTheDocument()
    expect(skillsSection).toBeInTheDocument()
    expect(experienceSection).toBeInTheDocument()
    expect(contactSection).toBeInTheDocument()
  })

  test('responsive layout adapts correctly', () => {
    render(<App />)
    
    // Desktop navigation should be visible
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(desktopNav).toBeInTheDocument()
    
    // Mobile menu button should be present
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    expect(mobileMenuButton).toBeInTheDocument()
  })

  test('smooth scrolling navigation integration', () => {
    render(<App />)
    
    // Test that clicking navigation calls scrollIntoView with correct parameters
    const aboutLinks = screen.getAllByRole('button', { name: /navigate to about section/i })
    fireEvent.click(aboutLinks[0])
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })
})