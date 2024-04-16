import { fireEvent, render } from '@testing-library/react'

import TestButton from '../TestButton'

it('calls the onClick handler when the button is clicked', () => {
  const onClickMock = jest.fn()
  const { getByText } = render(<TestButton label='Click me' onClick={onClickMock} />)

  fireEvent.click(getByText('Click me'))
  expect(onClickMock).toHaveBeenCalled()
})

// it('disables the button when disabled prop is true', () => {
//   const onClickMock = jest.fn();
//   const { getByText } = render(<TestButton label="Click me" disabled={true} onClick={onClickMock} />);
//   expect(getByText('Click me')).toBeDisabled();
// });

it('does not call the onClick handler when the button is clicked and disabled prop is true', () => {
  const onClickMock = jest.fn()
  const { getByText } = render(<TestButton label='Click me' onClick={onClickMock} disabled={true} />)

  fireEvent.click(getByText('Click me'))
  expect(onClickMock).not.toHaveBeenCalled()
})
