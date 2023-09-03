import { PasswordInput } from "src/views/components/input"

const PasswordForm = () => {
    return (
        <div className='grid grid-cols-1 gap-2 mt-10'>
        <PasswordInput label='არსებული პაროლი' />
        <PasswordInput label='ახალი პაროლი' />
        <PasswordInput label='გაიმეორე ახალი პაროლი' />
      </div>
    )
}

export default PasswordForm