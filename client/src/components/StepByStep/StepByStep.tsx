import { Timeline } from "../UI/TimeLine/TimeLine"
import { FaUserPlus, FaUsers, FaCode, FaRocket } from "react-icons/fa"

export function StepByStep() {
    const steps = [
        {
            title: "Step 1: Sign Up & Create Workspace",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-white  md:text-xl">
                        Users can sign up by entering their name and either
                        generating a random workspace code or choosing their
                        own. Once done, they can create their personal or team
                        workspace to start collaborating.
                    </p>
                    <div className="mb-4 flex justify-start">
                        <FaUserPlus className="text-5xl text-blue-400" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <img
                            src="https://ik.imagekit.io/0oeuxr64bc/Collaborative%20Code%20form.png?updatedAt=1740420820999"
                            alt="Creating workspace"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Step 2: Invite Your Team",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-white md:text-xl">
                        Easily invite teammates and start collaborating in
                        real-time.
                    </p>
                    <div className="mb-4 flex justify-start">
                        <FaUsers className="text-5xl text-green-400" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <img
                            src="https://ik.imagekit.io/0oeuxr64bc/Collaborating.jpg"
                            alt="Inviting team members"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Step 3: Start Coding Together",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-white md:text-xl">
                        Write, edit, and debug code simultaneously with live
                        updates.
                    </p>
                    <div className="mb-4 flex justify-start">
                        <FaCode className="text-5xl text-yellow-400" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <img
                            src="https://ik.imagekit.io/0oeuxr64bc/Invite%20your%20team.jpg"
                            alt="Live coding"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Step 4: Testing & Optimization",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-white md:text-xl">
                        Ensure a seamless coding experience by reviewing changes
                        in real-time. Debug code collaboratively, track updates
                        with version history, and refine your project with
                        instant feedback from teammates.
                    </p>
                    <div className="mb-4 flex justify-start     ">
                        <FaRocket className="text-5xl text-red-400" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <img
                            src="https://ik.imagekit.io/0oeuxr64bc/testing%20and%20collaboration.jpg"
                            alt="Running code"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
    ]

    return (
        <div className="w-full">
            <Timeline data={steps} />
        </div>
    )
}
