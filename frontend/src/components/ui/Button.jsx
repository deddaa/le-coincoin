

function Button({ text }) {
    return (
      <button className="bg-purple-500 hover:bg-purple-400 hover:translate-y-1 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200">
        {text}
      </button>
    );
}

export default Button;