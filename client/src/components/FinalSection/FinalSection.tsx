import { Link } from "react-router-dom";

export default function FinalSection() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
            {/* Main Content */}
            <div className="text-center">
                {/* Big Heading */}
                <h2 className="p-6 text-5xl font-extrabold md:text-7xl">
                    Code Without Limits.
                </h2>

                {/* Button */}
                <div className="mt-6">
                    <div className="group relative inline-flex items-center justify-center">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 opacity-60 blur-lg transition-all duration-1000 group-hover:opacity-100"></div>
                        <Link
                            role="button"
                            className="relative inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-600/30"
                            to="/form"
                        >
                            Start Coding Now
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 10 10"
                                height="12"
                                width="12"
                                fill="none"
                                className="-mr-1 ml-2 mt-0.5 stroke-white stroke-2"
                            >
                                <path
                                    d="M0 5h7"
                                    className="opacity-0 transition group-hover:opacity-100"
                                ></path>
                                <path
                                    d="M1 1l4 4-4 4"
                                    className="transition group-hover:translate-x-[3px]"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Logo in the Top Right Corner */}
            <div className="absolute right-10 top-10">
                
                <img
                    src="https://ik.imagekit.io/0oeuxr64bc/Logo-Bg-removed?updatedAt=1741094784685"
                    alt="CodeNexus Logo"
                    className="h-20 md:h-24"
                />
            </div>
        </section>
    )
}
