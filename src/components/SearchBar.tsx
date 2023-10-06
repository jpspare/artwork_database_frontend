import { useForm } from "react-hook-form"

type searchFormProps = {
    searchInputValue: string;
  };

type searchInputProps = {
    searchCallback: (search_input: string) => void;
}

const SearchBar = ( props: searchInputProps ) => {
    
    const { register, handleSubmit } = useForm<searchFormProps>();

    const onSubmit = (data: searchFormProps) => {
        let result = data['searchInputValue']
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
        props.searchCallback(result);
    }

    return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-1/2 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} 
            className="w-100 bg-slate-50 ps-2 h-8 flex place-items-center 
                rounded-sm"
        >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                className="mx-1 w-100 focus:outline-none flex-grow bg-transparent"
                placeholder="type to search"
                {...register('searchInputValue')}
            />
            <button className="p-1 border border-black border-1 rounded-sm">
                search
            </button>
        </form>
    </div>
  )
}

export default SearchBar
