import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const SearchTrackingId = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleSearch = (data) => {
        const search = data.search.trim();
        if (!search) {
            return;
        }
        navigate(`/tarck-parcel/${search}`)
        console.log(search)
    }
    return (
        <div className=' px-10 py-15'>
            <form
                onSubmit={handleSubmit(handleSearch)}
                className='flex justify-center'>
                <label className="input relative border-gray-200 outline-none'">
                    <input
                        {...register("search")}
                        className='outline-none'
                        type="search" required placeholder="Search" />

                    <button className='absolute top-0 border-none outline-none right-0 bg-primary text-secondary btn'>
                        <svg className="  h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                    </button>
                </label>
            </form>
        </div>
    )
}
