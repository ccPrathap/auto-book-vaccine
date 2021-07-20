import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VaccineForm from '../VaccineForm';

describe('renders form elements', () => {
  test('renders header', () => {
    render(<VaccineForm />);
    const headerElement = screen.getByText(/Search vaccine availablity for 18+/i);
    expect(headerElement).toBeInTheDocument();
  });
  
  test('renders elements', () => {
    render(<VaccineForm />);
    const pincodeElement = screen.getByPlaceholderText('Enter pincode');
    const dateElement = screen.getByPlaceholderText('dd-mm-yyyy');
    const submitButton = screen.getByRole('button');
    expect(pincodeElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});

test('renders form with data', () => {
  const pincode = '560068', date = '2021-07-21';
  render(<VaccineForm />);
  userEvent.type(screen.getByPlaceholderText('Enter pincode'), pincode);
  userEvent.type(screen.getByPlaceholderText('dd-mm-yyyy'), date);
  const submitButton = screen.getByRole('button');
  expect(screen.getByPlaceholderText('Enter pincode')).toHaveValue(Number(pincode));
  expect(screen.getByPlaceholderText('dd-mm-yyyy')).toHaveValue(date);
  expect(submitButton).not.toBeDisabled();
});

test('submit form with data', () => {
  const pincode = '560068', date = '2021-07-21';
  const updateSubOrg = jest.fn(), fetchSlots = jest.fn();
  render(<VaccineForm updateSubOrg={updateSubOrg} fetchSlots={fetchSlots} />);
  userEvent.type(screen.getByPlaceholderText('Enter pincode'), pincode);
  userEvent.type(screen.getByPlaceholderText('dd-mm-yyyy'), date);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  expect(updateSubOrg).toBeCalledWith(pincode);
  expect(fetchSlots).toBeCalledWith({ date, pincode });
});
