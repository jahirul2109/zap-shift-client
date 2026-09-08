import loadingImg from "../assets/van.svg";

const LoadingDashboard = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
            <div className="relative h-fit w-fit">

                {/* Van */}
                <img
                    src={loadingImg}
                    alt="Loading..."
                    className="
                        text-primary
                        h-[50vh]
                        w-full
                        animate-[drive_2s_ease-in-out_infinite]
                    "
                />

                {/* Road */}
                <div className="mt-2 border-b-4 border-dashed border-gray-300" />

            </div>

            <p className="mt-5 text-sm text-gray-500 animate-pulse">
                Loading your dashboard...
            </p>

        </div>
    );
};

export default LoadingDashboard;