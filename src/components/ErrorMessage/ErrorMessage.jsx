import './ErrorMessage.css'

export default function ErrorMessage({ errorClass, error }) {
  return (
    <div className={errorClass}>{error}</div>
  )
}
