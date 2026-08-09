import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ContactFooter from './ContactFooter.jsx'
import Projects, { ProjectLink } from './Projects.jsx'

describe('portfolio links', () => {
  it('hides project actions when their URLs are absent', () => {
    const { container } = render(<ProjectLink href={null}>Unavailable</ProjectLink>)
    expect(container).toBeEmptyDOMElement()
  })

  it('uses safe attributes for external project links', () => {
    render(<Projects />)

    for (const link of [
      screen.getByRole('link', { name: /live/i }),
      screen.getByRole('link', { name: /GitHub/i }),
    ]) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    }
  })

  it('uses safe attributes for external contact links', () => {
    render(<ContactFooter />)

    for (const name of [/linkedin/i, /github/i]) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })
})
