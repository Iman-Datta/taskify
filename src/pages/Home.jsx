import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          Your tasks, beautifully organized.
        </h1>

        <p className="text-gray-600 mb-8 max-w-xl">
          TaskFlow is a minimalist task manager built for people who value
          clarity. Prioritize, schedule, and accomplish — without the clutter.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Smart Priorities</h3>
            <p className="text-gray-600">
              Highlight what matters most and stay focused on important tasks.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Deadline Tracking</h3>
            <p className="text-gray-600">
              Keep track of deadlines with intuitive reminders and timers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is safe and accessible only to you.
            </p>
          </div>

        </div>
      </section>

      {/* Extra Content for Scroll Testing */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose TaskFlow?
        </h2>

        <p className="text-gray-600 mb-6">
          Built for simplicity. Designed for productivity. TaskFlow helps you
          stay organized without overwhelming you with unnecessary features.
        </p>

        <p className="text-gray-600">
          Scroll down to test your fixed navbar behavior and shadow effects.
          This extra section ensures your page has enough height to scroll.
        </p>
      </section>

    </div>
  );
}

export default Home;