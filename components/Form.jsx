import Link from "next/link"

const Form = ({ type, setPost, post, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
    </section>
  )
}

export default Form