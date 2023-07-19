import Link from "next/link"

const Form = ({ type, setPost, post, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination run wild with any AI-Powered platform
      </p>
      <form
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      onSubmit={handleSubmit}>
        <label>
          <span className="font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea 
          className="form_textarea"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt:e.target.value })}
          placeholder="Write your prompt here"
          required/>
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input 
          className="form_input"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          type="text"
          placeholder="#Tag"
          required/>
        </label>

        <div className="flex-end mx-6 mb-5 gap-4">
          <Link href='/' className="text-gray-500 text-sm">Cancel</Link>

          <button
          type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          disabled={submitting}>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form;